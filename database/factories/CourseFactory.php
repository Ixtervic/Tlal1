<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\User; 
use App\Models\Category;
use App\Models\Medium; // Si el modelo existe
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<Course>
 */
class CourseFactory extends Factory
{
    public function definition(): array
    {
        $title = $this->faker->unique()->sentence(rand(3, 6));
        $isPublished = $this->faker->boolean(70); 
        $level = $this->faker->randomElement(['beginner', 'intermediate', 'advanced']);
        
        return [
            // Usa ::first() para modelos que ya existen, o ::factory() si quieres crearlos
            'user_id' => User::inRandomOrder()->first()?->id, 
            'category_id' => Category::inRandomOrder()->first()?->id, 
            'thumbnail_media_id' => null, // Asume que Media no existe o siempre es nulo para simplificar. Cámbialo si tienes el modelo Media.
            
            'title' => $title,
            'slug' => Str::slug($title),
            'short_description' => $this->faker->optional()->paragraph(2),
            'description' => $this->faker->optional()->paragraphs(3, true),
            'level' => $level,
            'price' => $this->faker->randomFloat(2, 0, 500),
            'is_published' => $isPublished,
            'published_at' => $isPublished ? $this->faker->dateTimeBetween('-1 year', 'now') : null,
            'duration_minutes' => $this->faker->optional()->numberBetween(60, 1800),
        ];
    }
}