<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Item;
use App\Models\Category;
use App\Models\Stock;
use App\Models\Transaction;
use App\Models\TransactionDetail;

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

        // Buat kategori + item + stock
        $categories = Category::factory()
            ->count(5)
            ->has(
                Item::factory()
                    ->count(10)
                    ->has(Stock::factory())
            )
            ->create();

        // Ambil semua item sekali saja agar tidak query berulang
        $items = \App\Models\Item::pluck('id');

        // Buat transaksi + detail
        Transaction::factory()
            ->count(20)
            ->create()
            ->each(function ($transaction) use ($items) {
                TransactionDetail::factory()
                    ->count(rand(1, 5))
                    ->create([
                        'transaction_id' => $transaction->id,
                        'item_id'        => $items->random(), // pilih item secara acak
                    ]);
            });

    }
}
