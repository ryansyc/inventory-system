<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Transaction;
use App\Models\Item;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'type'      => $this->faker->randomElement(['in', 'out']),
            'date'      => $this->faker->dateTimeBetween('-1 year'),
            'notes'     => $this->faker->sentence(),
        ];
    }
}
