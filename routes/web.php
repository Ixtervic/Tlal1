<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\UserController;
use Inertia\Inertia;
use App\Http\Controllers\SearchController;

// 🔓 Público: cualquiera puede ver los cursos y buscar
Route::get('/', [CourseController::class, 'index'])->name('home');
Route::get('/cursos', [CourseController::class, 'index'])->name('courses.index');
Route::get('/buscar/{searched?}', [SearchController::class, 'search'])->name('search.results');

// 🔒 Protegidas (para instructores y admins)
Route::middleware(['auth'])->group(function () {
    Route::get('/cursos/crear', [CourseController::class, 'create'])
        ->name('courses.create')
        ->middleware('permission:courses.create');

    Route::post('/cursos', [CourseController::class, 'store'])
        ->name('courses.store')
        ->middleware('permission:courses.create');

    Route::get('/cursos/{id}/editar', [CourseController::class, 'edit'])
        ->name('courses.edit')
        ->middleware('permission:courses.edit');

    Route::delete('/cursos/{id}', [CourseController::class, 'destroy'])
        ->name('courses.destroy')
        ->middleware('permission:courses.destroy');
});

Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
Route::middleware(['auth', 'verified'])->group(function () {
    
});

/* Usuarios */

Route::middleware(['auth'])->group(function () {
    Route::get('usuarios', [UserController::class, 'index'])
        ->name('users.index')
        ->middleware('permission:users.index');

    Route::get('usuarios/{id}', [UserController::class, 'show'])
        ->name('users.show')
        ->middleware('permission:users.show');

    Route::post('usuarios', [UserController::class, 'store'])
        ->name('users.create')
        ->middleware('permission:users.create');

    Route::put('usuarios/{id}', [UserController::class, 'update'])
        ->name('users.edit')
        ->middleware('permission:users.edit');

    Route::delete('usuarios/{id}', [UserController::class, 'destroy'])
        ->name('users.destroy')
        ->middleware('permission:users.destroy');
});

// Cursos
Route::get('cursos/{id}', [CourseController::class, 'show'])
    ->name('courses.show')
    ->middleware('permission:courses.show');

/*
Route::get('cursos', [CourseController::class, 'index'])
    ->name('courses.index')
    ->middleware('permission:courses.index');

Route::post('cursos', [CourseController::class, 'store'])
    ->name('courses.create')
    ->middleware('permission:courses.create');

Route::put('cursos/{id}', [CourseController::class, 'update'])
    ->name('courses.edit')
    ->middleware('permission:courses.edit');

Route::delete('cursos/{id}', [CourseController::class, 'destroy'])
    ->name('courses.destroy')
    ->middleware('permission:courses.destroy');
*/

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
