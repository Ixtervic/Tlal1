// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-lime-100 via-green-100 to-emerald-100">
            <AuthLayout
                title="Verifica tu correo electrónico"
                description="Revisa tu bandeja de entrada y haz clic en el enlace que te enviamos para completar la verificación."
            >
                <Head title="Verificación de correo electrónico" />

                <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
                    {status === 'verification-link-sent' && (
                        <div className="mb-4 text-sm font-medium text-green-700">
                            ¡Se ha enviado un nuevo enlace de verificación al correo electrónico que proporcionaste durante el registro!
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <Button
                            disabled={processing}
                            className="w-full rounded-lg bg-green-700 font-semibold text-white transition-all hover:bg-green-800"
                        >
                            {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                            Reenviar enlace de verificación
                        </Button>

                        <TextLink
                            href={route('logout')}
                            method="post"
                            className="mx-auto block text-sm font-medium text-green-700 hover:text-green-800"
                        >
                            Cerrar sesión
                        </TextLink>
                    </form>
                </div>
            </AuthLayout>
        </div>
    );
}
