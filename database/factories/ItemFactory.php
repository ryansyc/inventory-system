<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Item>
 */
class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'code' => $this->faker->unique()->numerify('ITM-####'),
            'name' => $this->faker->words(2, true),
            'unit' => $this->faker->randomElement(['Pcs', 'Kg', 'Box', 'Set']),
            'quantity' => $this->faker->numberBetween(1, 1000),
        ];
    }
}
