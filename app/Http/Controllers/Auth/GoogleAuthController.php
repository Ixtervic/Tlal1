<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Kreait\Firebase\Factory;
use Kreait\Firebase\Auth as FirebaseAuth;

class GoogleAuthController extends Controller
{
    public function store(Request $request)
    {
        $idToken = $request->input('token');

        // Inicializa Firebase Admin
        $firebase = (new Factory)->withServiceAccount(base_path('firebase_credentials.json'));
        $auth = $firebase->createAuth();

        try {
            $verifiedIdToken = $auth->verifyIdToken($idToken);
            $firebaseUid = $verifiedIdToken->claims()->get('sub');

            // Datos del usuario
            $firebaseUser = $auth->getUser($firebaseUid);

            // Buscar o crear usuario local
            $user = User::firstOrCreate(
                ['email' => $firebaseUser->email],
                [
                    'name' => $firebaseUser->displayName ?? 'Usuario Google',
                    'password' => bcrypt(str()->random(16)), // placeholder
                ]
            );

            if (!$user->hasAnyRole()) {
                $user->assignRole('student');
            }

            Auth::login($user);

            return redirect()->intended('/dashboard');
        } catch (\Throwable $e) {
            return response()->json(['error' => 'Token inválido', 'details' => $e->getMessage()], 401);
        }
    }
}
