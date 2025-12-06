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
    public function definition()
    {
        $price = $this->faker->numberBetween(1000, 50000);
        $qty   = $this->faker->numberBetween(1, 50);

        return [
            'transaction_id' => Transaction::factory(),
            'item_id'        => Item::factory(),
            'quantity'       => $qty,
            'price'          => $price,
            'total_price'    => $qty * $price,
        ];
    }
}
