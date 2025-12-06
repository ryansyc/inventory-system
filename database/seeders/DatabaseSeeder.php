<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Item;
use App\Models\Transaction;
use App\Models\TransactionItem;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Buat master item terlebih dahulu
        Item::factory()->count(50)->create();

        // Buat transaksi
        Transaction::factory()
            ->count(20)
            ->create()
            ->each(function ($trx) {
                // Ambil beberapa item random
                $itemIds = Item::inRandomOrder()->take(rand(2, 6))->pluck('id');

                $total = 0;

                foreach ($itemIds as $id) {
                    $qty   = rand(1, 20);
                    $price = rand(1000, 30000);
                    $lineTotal = $qty * $price;

                    TransactionItem::create([
                        'transaction_id' => $trx->id,
                        'item_id'        => $id,
                        'quantity'       => $qty,
                        'price'          => $price,
                        'total_price'    => $lineTotal,
                    ]);

                    $total += $lineTotal;
                }

                // update total transaksi
                $trx->update([
                    'total_amount' => $total
                ]);
            });
    }
}
