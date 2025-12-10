<?php

namespace App\Filament\Resources\Transactions\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Repeater\TableColumn;
use Filament\Forms\Components\TextInput;
use App\Models\Item;
use Filament\Forms\Components\Hidden;

class TransactionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(2)
            ->components([
                Select::make('type')
                    ->columnStart(1)
                    ->required()
                    ->options([
                        'Inbound' => 'Inbound',
                        'Outbound' => 'Outbound',
                    ]),

                Textarea::make('description')
                    ->columnStart(2),

                Repeater::make('transactionItems')
                    ->label('Items')
                    ->relationship('transactionItems')
                    ->columnSpanFull()
                    ->table([
                        TableColumn::make('Code'),
                        TableColumn::make('Name'),
                        TableColumn::make('Unit'),
                        TableColumn::make('Quantity'),
                    ])
                    ->schema([
                        Hidden::make('item_id'),
                        TextInput::make('code')
                            ->required()
                            ->live(onBlur: true)
                            ->afterStateUpdated(function (string $state, callable $set) {
                                $item = Item::where('code', $state)->first();

                                if ($item) {
                                    $set('item_id', $item->id);
                                    $set('name', $item->name);
                                    $set('unit', $item->unit);
                                } else {
                                    $set('id', null);
                                    $set('name', null);
                                    $set('unit', null);
                                }
                            }),
                        TextInput::make('name')
                            ->required()
                            ->readOnly(fn ($state) => filled($state)),
                        TextInput::make('unit')
                            ->required()
                            ->readOnly(fn ($state) => filled($state)),
                        TextInput::make('quantity')
                            ->required(),
                    ])
                    ->dehydrated(true)
            ]);
    }
}
