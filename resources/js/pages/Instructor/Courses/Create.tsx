import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CustomTextArea } from '@/components/ui/custom-textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, LoaderCircle } from 'lucide-react';

export default function Create({ ...props }, Course = {}) {
    const { course, isView, isEdit } = props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `${isEdit ? 'Editar' : isView ? 'Ver' : 'Crear'} Curso`,
            href: isEdit ? route('instructor.courses.edit', course.id) : route('instructor.courses.create'),
        },
    ];

    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: course?.title || '',
        description: course?.description || '',
        price: course?.price || '',
        category_id: course?.category_id || '',
        image: null as File | null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value !== null) {
                formData.append(key, value as any);
            }
        });

        if (isEdit) {
            put(route('instructor.courses.update', course.id), {
                forceFormData: true,
                onSuccess: () => reset(),
            });
        } else {
            post(route('instructor.courses.store'), {
                forceFormData: true,
                onSuccess: () => reset(),
            });
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setData('image', e.target.files[0]);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${isEdit ? 'Editar Curso' : isView ? 'Ver Curso' : 'Crear Curso'}`} />

            {/* Botón Volver */}
            <div className="mb-4 ml-auto">
                <Link
                    as="button"
                    href={route('instructor.courses.index')}
                    className="text-md cursor-pointer rounded-lg bg-green-700 px-4 py-2 text-white transition hover:bg-green-800"
                >
                    <span className="flex items-center gap-2">
                        <ArrowLeft size={20} />
                        Volver
                    </span>
                </Link>
            </div>

            <Card className="shadow-xl dark:bg-gray-800">
                <CardContent>
                    <form className="flex flex-col gap-6" onSubmit={submit} autoComplete="off">
                        <div className="grid gap-6">
                            {/* Título */}
                            <div className="grid gap-2">
                                <Label htmlFor="title">Título del curso</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    autoFocus
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    disabled={processing || isView}
                                    placeholder="Ej: Fundamentos de React"
                                />
                                <InputError message={errors.title} />
                            </div>

                            {/* Descripción */}
                            <div className="grid gap-2">
                                <Label htmlFor="description">Descripción</Label>
                                <CustomTextArea
                                    id="description"
                                    rows={4}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    disabled={processing || isView}
                                    placeholder="Describe brevemente el contenido del curso..."
                                />
                                <InputError message={errors.description} />
                            </div>

                            {/* Categoría */}
                            <div className="grid gap-2">
                                <Label htmlFor="category_id">Categoría</Label>
                                <Input
                                    id="category_id"
                                    type="text"
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', e.target.value)}
                                    disabled={processing || isView}
                                    placeholder="ID o nombre de categoría"
                                />
                                <InputError message={errors.category_id} />
                            </div>

                            {/* Precio */}
                            <div className="grid gap-2">
                                <Label htmlFor="price">Precio (MXN)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    disabled={processing || isView}
                                    placeholder="Ej: 299.99"
                                />
                                <InputError message={errors.price} />
                            </div>

                            {/* Imagen */}
                            {!isView && (
                                <div className="grid gap-2">
                                    <Label htmlFor="image">Imagen del curso (opcional)</Label>
                                    <Input id="image" type="file" accept="image/*" onChange={handleFileChange} disabled={processing} />
                                    <InputError message={errors.image} />
                                </div>
                            )}

                            {/* Vista previa de imagen */}
                            {(isEdit || isView) && course?.image && (
                                <div className="grid gap-2">
                                    <Label>Imagen actual</Label>
                                    <img
                                        src={`/${course.image}`}
                                        alt="Imagen del curso"
                                        className="h-40 w-60 rounded-lg border border-gray-300 object-cover"
                                    />
                                </div>
                            )}

                            {/* Botón Guardar */}
                            {!isView && (
                                <Button type="submit" disabled={processing} className="mt-2 w-fit bg-green-700 text-white hover:bg-green-800">
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    {processing ? (isEdit ? 'Actualizando...' : 'Guardando...') : isEdit ? 'Actualizar' : 'Guardar'}
                                </Button>
                            )}
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
