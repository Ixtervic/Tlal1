<?php

namespace Database\Factories;

use App\Models\Module;
use App\Models\Course; 
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<Module>
 */
class ModuleFactory extends Factory
{
    public function definition(): array
    {
        return [
            'course_id' => Course::inRandomOrder()->first()?->id, 
            'title' => $this->faker->sentence(rand(2, 4)),
            'description' => $this->faker->optional()->paragraph(2),
            'position' => $this->faker->numberBetween(1, 10), 
        ];
    }
}