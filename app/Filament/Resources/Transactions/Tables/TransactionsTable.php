<?php

namespace App\Filament\Resources\Transactions\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Actions\ViewAction;
use Filament\Tables\Filters\SelectFilter;
use Filament\Support\Colors\Color;


class TransactionsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->recordAction(null)
            ->columns([
                TextColumn::make('created_at')
                    ->dateTime('M j, Y | H:i:s')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Inbound' => 'success',
                        'Outbound' => 'danger',
                    })
                    ->sortable(),

                TextColumn::make('description')
            ])
            ->filters([
                SelectFilter::make('type')
                    ->options([
                        'Inbound' => 'Inbound',
                        'Outbound' => 'Outbound',
                    ])
            ])
            ->recordActions([
                ViewAction::make()
                    ->color('primary')
                    ->badge(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
