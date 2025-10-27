<?php

namespace Database\Factories;

use App\Models\Lesson;
use App\Models\Module; 
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<Lesson>
 */
class LessonFactory extends Factory
{
    public function definition(): array
    {
        $title = $this->faker->sentence(rand(3, 5));
        
        return [
            'module_id' => Module::inRandomOrder()->first()?->id, 
            'title' => $title,
            'slug' => Str::slug($title) . '-' . $this->faker->unique()->randomNumber(4),
            'content_text' => $this->faker->optional()->paragraphs(rand(3, 6), true),
            'duration_seconds' => $this->faker->optional()->numberBetween(60, 3600),
            'position' => $this->faker->numberBetween(1, 15), 
            'is_required' => $this->faker->boolean(90), 
        ];
    }
}