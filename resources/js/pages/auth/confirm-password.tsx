// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<{ password: string }>>({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-lime-100 via-green-100 to-emerald-100">
            <AuthLayout title="Confirma tu contraseña" description="Por seguridad, confirma tu contraseña antes de continuar.">
                <Head title="Confirmar contraseña" />

                <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Ingresa tu contraseña"
                                autoComplete="current-password"
                                value={data.password}
                                autoFocus
                                onChange={(e) => setData('password', e.target.value)}
                            />

                            <InputError message={errors.password} />
                        </div>

                        <div className="flex items-center justify-center">
                            <Button
                                className="w-full rounded-lg bg-green-700 font-semibold text-white transition-all hover:bg-green-800"
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                Confirmar contraseña
                            </Button>
                        </div>
                    </form>
                </div>
            </AuthLayout>
        </div>
    );
}
