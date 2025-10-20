// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-lime-100 via-green-100 to-emerald-100">
            <>
                <Head title="Recuperar contraseña" />

                <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                    <h1 className="mb-1 text-center text-3xl font-bold text-green-700">¡Recupera tu contraseña!</h1>
                    <p className="mb-6 text-center text-gray-600">Ingresa tu correo electrónico para recibir el enlace de restablecimiento</p>
                    {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Correo electrónico</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="off"
                                value={data.email}
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="ejemplo@correo.com"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="my-4">
                            <Button
                                className="w-full rounded-lg bg-green-700 font-semibold text-white transition-all hover:bg-green-800"
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                Enviar enlace de restablecimiento
                            </Button>
                        </div>
                    </form>

                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        <span>¿Recordaste tu contraseña? </span>
                        <TextLink href={route('login')} className="font-medium text-green-700 hover:text-green-800">
                            Inicia sesión
                        </TextLink>
                    </div>
                </div>
            </>
        </div>
    );
}
