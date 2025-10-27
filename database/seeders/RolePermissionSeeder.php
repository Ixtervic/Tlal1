<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Limpia caché de permisos
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        /**
         * 📋 Permisos base para cada módulo
         */
        $permissions = [
            // Usuarios
            'users.index',
            'users.show',
            'users.create',
            'users.edit',
            'users.destroy',

            // Cursos
            'courses.index',
            'courses.show',
            'courses.create',
            'courses.edit',
            'courses.destroy',

            // Categorías
            'categories.index',
            'categories.create',
            'categories.edit',
            'categories.destroy',

            // Inscripciones
            'enrollments.index',
            'enrollments.create',
            'enrollments.destroy',

            // Comentarios
            'comments.index',
            'comments.create',
            'comments.destroy',

            // Módulos y Lecciones
            'modules.index',
            'modules.create',
            'modules.edit',
            'modules.destroy',
            'lessons.index',
            'lessons.create',
            'lessons.edit',
            'lessons.destroy',

            // Valoraciones
            'ratings.index',
            'ratings.create',
            'ratings.destroy',
        ];

        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm]);
        }

        /**
         * 👤 Roles
         */
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $instructorRole = Role::firstOrCreate(['name' => 'instructor']);
        $studentRole = Role::firstOrCreate(['name' => 'student']);

        /**
         * 🧩 Asignación de permisos por rol
         */

        // Admin → todos los permisos
        $adminRole->givePermissionTo(Permission::all());

        // Instructor → permisos sobre sus cursos y módulos
        $instructorRole->givePermissionTo([
            'courses.index',
            'courses.show',
            'courses.create',
            'courses.edit',
            'courses.destroy',
            'modules.index',
            'modules.create',
            'modules.edit',
            'modules.destroy',
            'lessons.index',
            'lessons.create',
            'lessons.edit',
            'lessons.destroy',
            'comments.index',
            'comments.create',
            'ratings.index',
            'ratings.create',
        ]);

        // Student → permisos limitados
        $studentRole->givePermissionTo([
            'courses.index',
            'courses.show',
            'enrollments.index',
            'enrollments.create',
            'comments.create',
            'ratings.create',
        ]);

        /**
         * 👑 Asignar roles a usuarios de ejemplo
         * (opcional, para pruebas)
         
        $admin = User::firstOrCreate([
            'email' => 'admin@tlaliestancia.com'
        ], [
            'name' => 'Administrador Principal',
            'password' => bcrypt('admin123'),
        ]);
        $admin->assignRole($adminRole);

        $instructor = User::firstOrCreate([
            'email' => 'instructor@tlaliestancia.com'
        ], [
            'name' => 'Instructor Ejemplo',
            'password' => bcrypt('instructor123'),
        ]);
        $instructor->assignRole($instructorRole);

        $student = User::firstOrCreate([
            'email' => 'estudiante@tlaliestancia.com'
        ], [
            'name' => 'Estudiante Ejemplo',
            'password' => bcrypt('estudiante123'),
        ]);
        $student->assignRole($studentRole);
        */
    }
}
