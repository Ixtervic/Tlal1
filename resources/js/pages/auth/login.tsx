import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeClosed, LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import GoogleLogin from '@/components/GoogleLogin';
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

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
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
                        <Label htmlFor="password" className="text-gray-600">
                            Contraseña
                        </Label>

                        {/* Contenedor relativo para el campo y el botón */}
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="********"
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                className="text-gray-500"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                            />

                            {/* Botón para Mostrar/Ocultar Contraseña */}
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5 text-gray-400 hover:text-gray-600 focus:outline-none"
                                onClick={togglePasswordVisibility}
                                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                            >
                                {/* Puedes usar un ícono de ojo si tienes alguno */}
                                {showPassword ? <EyeClosed /> : <Eye />}
                            </button>
                        </div>

                        <InputError message={errors.password} />
                    </div>

                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
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
                        {canResetPassword && (
                            <TextLink href={route('password.request')} className="text-sm text-green-700 hover:underline" tabIndex={5}>
                                ¿Olvidaste tu contraseña?
                            </TextLink>
                        )}
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

                    {/* Separador visual */}
                    <div className="my-6 flex items-center">
                        <div className="h-px flex-1 bg-gray-300" />
                        <span className="mx-3 text-sm text-gray-500">o</span>
                        <div className="h-px flex-1 bg-gray-300" />
                    </div>

                    {/* Botón de Google */}
                    <GoogleLogin />

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
