import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Iniciar sesión" />

            <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-green-100 to-lime-200 px-4">
                <form onSubmit={submit} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
                    <h1 className="mb-1 text-center text-3xl font-bold text-green-700">¡Bienvenido de nuevo!</h1>
                    <p className="mb-6 text-center text-gray-600">Inicia sesión para continuar explorando Tlali.</p>

                    <div className="mb-4">
                        <Label htmlFor="email" className="text-gray-600">
                            Correo electrónico
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="ejemplo@correo.com"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            className="text-gray-500"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="mb-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="text-gray-600">
                                Contraseña
                            </Label>
                            {canResetPassword && (
                                <TextLink href={route('password.request')} className="text-sm text-green-700 hover:underline" tabIndex={5}>
                                    ¿Olvidaste tu contraseña?
                                </TextLink>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            placeholder="********"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            className="text-gray-500"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="mb-4 flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            tabIndex={3}
                        />
                        <Label htmlFor="remember" className="text-gray-600">
                            Recuérdame
                        </Label>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-green-700 text-white transition-colors duration-300 hover:bg-green-800"
                        tabIndex={4}
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        Acceder
                    </Button>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        ¿No tienes una cuenta?{' '}
                        <TextLink href={route('register')} className="text-green-700 underline" tabIndex={5}>
                            Regístrate
                        </TextLink>
                    </div>

                    {status && <div className="mt-4 text-center text-sm font-medium text-green-600">{status}</div>}
                </form>
            </div>
        </>
    );
}
