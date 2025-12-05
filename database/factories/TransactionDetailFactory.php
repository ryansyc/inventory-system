<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TransactionDetail>
 */
class TransactionDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [

            'transaction_id' => null,
            'item_id'        => null,
            'quantity'       => $this->faker->numberBetween(1, 100),
            'unit_price'     => $this->faker->randomFloat(2, 1000, 50000),
        ];
    }
}
