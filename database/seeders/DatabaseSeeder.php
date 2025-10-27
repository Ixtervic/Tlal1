<?php

namespace Database\Seeders;

use App\Models\Category;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Course;
use App\Models\Module;
use App\Models\Lesson;
use App\Models\User; // Asegúrate de importar tu modelo User
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Crear al menos un usuario (necesario para la clave foránea user_id en courses)
        // Puedes crear 10 usuarios o solo uno. Aquí creamos 10.
        User::factory(10)->create();

        // 2. Crear las categorías
        Category::factory(5)->create();

        // 3. Crear los cursos y sus dependencias (Módulos y Lecciones)
        // Usamos una callback para asegurar que el seeding de módulos y lecciones
        // se haga después de que el curso haya sido creado.
        Course::factory(20)
            ->create()
            ->each(function (Course $course) {
                // Crear entre 3 y 8 módulos para cada curso
                Module::factory(rand(3, 8))
                    ->for($course) // Asigna el course_id automáticamente
                    ->create()
                    ->each(function (Module $module) {
                        // Crear entre 5 y 15 lecciones para cada módulo
                        Lesson::factory(rand(5, 15))
                            ->for($module) // Asigna el module_id automáticamente
                            ->create();
                    });
            });
    }
}