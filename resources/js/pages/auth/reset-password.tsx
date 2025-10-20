import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

interface ResetPasswordProps {
    token: string;
    email: string;
}

type ResetPasswordForm = {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<ResetPasswordForm>>({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-lime-100 via-green-100 to-emerald-100">
            <AuthLayout title="Restablecer contraseña" description="Introduce tu nueva contraseña para continuar">
                <Head title="Restablecer contraseña" />

                <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Correo electrónico</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                value={data.email}
                                readOnly
                                className="mt-1 block w-full cursor-not-allowed bg-gray-100"
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Nueva contraseña</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                autoComplete="new-password"
                                value={data.password}
                                autoFocus
                                className="mt-1 block w-full"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="********"
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">Confirmar contraseña</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                placeholder="********"
                            />
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <Button
                            type="submit"
                            className="mt-4 w-full rounded-lg bg-green-700 font-semibold text-white transition-all hover:bg-green-800"
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                            Restablecer contraseña
                        </Button>
                    </form>
                </div>
            </AuthLayout>
        </div>
    );
}
