<?php

namespace App\Filament\Resources\Transactions\Pages;

use App\Filament\Resources\Transactions\TransactionResource;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Database\Eloquent\Model;
use App\Models\Item;

class CreateTransaction extends CreateRecord
{
    protected static string $resource = TransactionResource::class;

    protected function handleRecordCreation(array $data): Model
    {
        $transactionItems = $data['transactionItems'];

        foreach ($transactionItems as $incomingItem) {
            $item = Item::where('id', $incomingItem['item_id'])->first();

            if (!$item) {
                $item = Item::create($data['transactionItems']);
            }

            $type = $data['type'];

            if ($type === 'Inbound') {
                $item['quantity'] += $incomingItem['quantity'];
            } else {
                $item['quantity'] -= $incomingItem['quantity'];
            }

            $item->save();
        }

        return static::getModel()::create($data);
    }
}
