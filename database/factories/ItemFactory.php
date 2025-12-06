<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Category;

class ItemFactory extends Factory
{
    public function definition()
    {
        return [
            'code'      => strtoupper($this->faker->bothify('SKU-#####')),
            'name'      => $this->faker->words(2, true),
            'unit'      => 'pcs',
            'stock'     => $this->faker->numberBetween(0, 500),
        ];
    }
}
