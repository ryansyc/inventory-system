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
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'a@a.com'],
            [
                'name' => 'Test User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        // generate item
        $items = Item::factory()->count(50)->create();

        // generate transaksi + detail
        Transaction::factory()
            ->count(20)
            ->create()
            ->each(function ($transaction) use ($items) {

                // pilih random 1–5 item
                $selected = $items->random(rand(1, 5));

                foreach ($selected as $item) {
                    TransactionItem::factory()->create([
                        'transaction_id' => $transaction->id,
                        'item_id'        => $item->id,
                    ]);
                }
            });
    }
}
