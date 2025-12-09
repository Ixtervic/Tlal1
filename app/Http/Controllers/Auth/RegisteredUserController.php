<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Role;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Crear usuario
        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Obtener dominio del correo
        $email = $user->email;
        $domain = substr(strrchr($email, '@'), 1); // obtiene lo que va después de '@'

        // Asignar el rol según el dominio
        $roleName = match ($domain) {
            'gmail.com'            => 'student',
            'mycorreo.upp.edu.mx'  => 'instructor',
            'admin.com'            => 'admin',
            default                => 'student', // Rol por defecto
        };

        // Asignar rol usando Spatie
        $user->assignRole($roleName);

        // Evento de usuario registrado
        event(new Registered($user));

        // Autologin
        Auth::login($user);

        // Redirigir a la página principal de cursos
        return redirect()->intended(route('courses.index', absolute: false));
    }
}
