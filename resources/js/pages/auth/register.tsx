import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeClosed, LoaderCircle } from 'lucide-react';
import React, { FormEventHandler, useState } from 'react';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
        setter((prev) => !prev);
    };

    return (
        <>
            <Head title="Crear cuenta" />
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-green-100 to-lime-200 px-4">
                <form onSubmit={submit} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
                    <h1 className="mb-1 text-center text-3xl font-bold text-green-700">Crear cuenta</h1>
                    <p className="mb-6 text-center text-gray-600">Regístrate para comenzar tu camino en el aprendizaje agrícola.</p>
                    <div className="mb-4">
                        <Label htmlFor="name" className="text-gray-500">
                            Nombre completo
                        </Label>
                        <Input
                            id="name"
                            placeholder="Tu nombre completo"
                            required
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        <InputError message={errors.name} />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="email" className="text-gray-500">
                            Correo electrónico
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="ejemplo@correo.com"
                            required
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="password" className="text-gray-500">
                            Contraseña
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="********"
                                required
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="text-gray-500"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5 text-gray-400 hover:text-gray-600 focus:outline-none"
                                onClick={() => togglePasswordVisibility(setShowPassword)}
                                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                            >
                                {showPassword ? <EyeClosed /> : <Eye />}
                            </button>
                        </div>
                        <InputError message={errors.password} />
                    </div>
                    <div className="mb-6">
                        <Label htmlFor="password_confirmation" className="text-gray-500">
                            Confirmar contraseña
                        </Label>
                        <div className="relative">
                            <Input
                                id="password_confirmation"
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="********"
                                required
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="text-gray-500"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5 text-gray-400 hover:text-gray-600 focus:outline-none"
                                onClick={() => togglePasswordVisibility(setShowConfirmPassword)}
                                aria-label={showConfirmPassword ? 'Ocultar confirmación' : 'Mostrar confirmación'}
                            >
                                {showConfirmPassword ? <EyeClosed /> : <Eye />}
                            </button>
                        </div>
                        <InputError message={errors.password_confirmation} />
                    </div>
                    <Button type="submit" className="w-full bg-green-700 text-white hover:bg-green-800" disabled={processing}>
                        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        Crear cuenta
                    </Button>
                    <div className="mt-6 text-center text-sm text-gray-600">
                        ¿Ya tienes una cuenta?{' '}
                        <TextLink href={route('login')} className="text-green-700 underline">
                            Inicia sesión
                        </TextLink>
                    </div>
                </form>
            </div>
        </>
    );
}
