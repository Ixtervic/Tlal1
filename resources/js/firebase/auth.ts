// resources/js/firebase/auth.ts
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './config';

const provider = new GoogleAuthProvider();

/**
 * Inicia sesión con Google y obtiene el token del usuario
 */
export async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Token de Firebase (para enviar al backend Laravel)
        const idToken = await user.getIdToken();

        return { user, idToken };
    } catch (error) {
        console.error('Error al iniciar sesión con Google:', error);
        throw error;
    }
}
