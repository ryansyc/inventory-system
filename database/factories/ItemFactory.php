<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Category;

class ItemFactory extends Factory
{
    public function definition()
    {
        return [
            'category_id' => Category::factory(),
            'code'        => strtoupper($this->faker->bothify('ITM-####')),
            'name'        => $this->faker->words(3, true),
            'unit'        => $this->faker->randomElement(['pcs', 'box', 'kg', 'litre']),
            'min_stock'   => $this->faker->numberBetween(1, 50),
        ];
    }
}
