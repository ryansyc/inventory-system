<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Transaction;
use App\Models\Item;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TransactionItem>
 */
class TransactionItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {   
        $itemBuilder = Item::factory(); 
        $item = $itemBuilder->createOne();

        return [
            'transaction_id' => Transaction::factory(),
            'item_id' => $item->id,
            'code' => $item->code,
            'name' => $item->name,
            'unit' => $item->unit,
            'quantity' => $this->faker->numberBetween(1, 10),
        ];
    }
}
