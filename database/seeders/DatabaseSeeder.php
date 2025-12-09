<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Item;
use App\Models\Transaction;
use App\Models\TransactionItem;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'password' => 'admin',
        ]);

        Item::factory(10)->create();

        Transaction::factory(10)->create()
            ->each(function ($transaction) {
                $items = Item::all()->random(rand(1, 4));

                foreach ($items as $item) {
                    TransactionItem::factory()->create([
                        'transaction_id' => $transaction->id,
                        'item_id' => $item->id,
                        'quantity' => rand(1, 5), 
                    ]);
                }
            });
    }
}
