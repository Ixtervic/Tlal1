import { Button } from '@/components/ui/button';
import { signInWithGoogle } from '@/firebase/auth';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

export default function GoogleLogin({ label = 'Iniciar sesión con Google' }) {
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            const { idToken } = await signInWithGoogle();

            // Envío directo al backend Laravel
            router.post(
                '/auth/google',
                { token: idToken },
                {
                    onError: (errors) => {
                        console.error('Error en autenticación:', errors);
                        alert('Error al conectar con Google.');
                    },
                    onFinish: () => setLoading(false),
                },
            );
        } catch (err) {
            console.error(err);
            alert('Error al iniciar sesión con Google.');
            setLoading(false);
        }
    };

    return (
        <Button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        >
            <FcGoogle className="text-xl" />
            {loading ? 'Conectando...' : label}
        </Button>
    );
}
