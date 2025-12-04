<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ItemFactory extends Factory
{
    public function definition()
    {
        return [
            'barcode' => $this->faker->unique()->ean13(),
            'name' => $this->faker->words(2, true),
            'uom' => $this->faker->randomElement(['pcs', 'kg', 'box', 'pack']),
            'status' => $this->faker->randomElement(['Active', 'Inactive']),
        ];
    }
}
