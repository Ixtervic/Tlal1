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

interface Category {
    id: number;
    name: string;
}

interface CreateProps {
    categories: Category[];
    course?: any;
    isView?: boolean;
    isEdit?: boolean;
}

export default function Create({ categories, course, isView, isEdit }: CreateProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `${isEdit ? 'Editar' : isView ? 'Ver' : 'Crear'} Curso`,
            href: isEdit ? route('instructor.courses.edit', course.id) : route('instructor.courses.create'),
        },
    ];

    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: course?.title || '',
        short_description: course?.short_description || '',
        description: course?.description || '',
        category_id: course?.category_id || '',
        level: course?.level || 'beginner',
        price: course?.price || 0,
        duration_minutes: course?.duration_minutes || '',
        is_published: course ? course.is_published : true,
        published_at: course?.published_at || new Date().toISOString().slice(0, 16),
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            put(route('instructor.courses.update', course.id), {
                onSuccess: () => reset(),
            });
        } else {
            post(route('instructor.courses.store'), {
                onSuccess: () => reset(),
            });
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

                            {/* Short Description */}
                            <div className="grid gap-2">
                                <Label htmlFor="short_description">Descripción corta</Label>
                                <CustomTextArea
                                    id="short_description"
                                    rows={3}
                                    value={data.short_description}
                                    onChange={(e) => setData('short_description', e.target.value)}
                                    disabled={processing || isView}
                                    placeholder="Resumen breve del curso..."
                                />
                                <InputError message={errors.short_description} />
                            </div>

                            {/* Descripción completa */}
                            <div className="grid gap-2">
                                <Label htmlFor="description">Descripción completa</Label>
                                <CustomTextArea
                                    id="description"
                                    rows={6}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    disabled={processing || isView}
                                    placeholder="Describe detalladamente el curso..."
                                />
                                <InputError message={errors.description} />
                            </div>

                            {/* Categoría */}
                            <div className="grid gap-2">
                                <Label htmlFor="category_id">Categoría</Label>
                                <select
                                    id="category_id"
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', e.target.value)}
                                    disabled={processing || isView}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                >
                                    <option value="">Selecciona una categoría</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.category_id} />
                            </div>

                            {/* Nivel */}
                            <div className="grid gap-2">
                                <Label htmlFor="level">Nivel</Label>
                                <select
                                    id="level"
                                    value={data.level}
                                    onChange={(e) => setData('level', e.target.value)}
                                    disabled={processing || isView}
                                    className="flex h-10 w-full rounded-md border px-3 py-2"
                                >
                                    <option value="beginner">Principiante</option>
                                    <option value="intermediate">Intermedio</option>
                                    <option value="advanced">Avanzado</option>
                                </select>
                                <InputError message={errors.level} />
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

                            {/* Duración en minutos */}
                            <div className="grid gap-2">
                                <Label htmlFor="duration_minutes">Duración (minutos)</Label>
                                <Input
                                    id="duration_minutes"
                                    type="number"
                                    value={data.duration_minutes}
                                    onChange={(e) => setData('duration_minutes', e.target.value)}
                                    disabled={processing || isView}
                                    placeholder="Ej: 120"
                                />
                                <InputError message={errors.duration_minutes} />
                            </div>

                            {/* Fecha de publicación solo en modo edición */}
                            {isEdit && (
                                <div className="grid gap-2">
                                    <Label htmlFor="published_at">Fecha de publicación</Label>
                                    <Input
                                        id="published_at"
                                        type="datetime-local"
                                        value={data.published_at}
                                        onChange={(e) => setData('published_at', e.target.value)}
                                        disabled={processing}
                                    />
                                    <InputError message={errors.published_at} />
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
