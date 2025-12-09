import AppLayout from '@/layouts/app-layout';
import { Course } from '@/types/Course';
import { Head, Link, useForm } from '@inertiajs/react';

interface Props {
    course: Course;
    is_enrolled: boolean;
}

export default function Show({ course, is_enrolled }: Props) {
    const { post, processing } = useForm();

    const handleEnrollment = () => {
        post(route('courses.enroll', course.id));
    };

    return (
        <AppLayout>
            <Head title={`Curso: ${course.title}`} />

            <div className="mx-auto max-w-5xl space-y-6 py-10">
                {/* Título */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{course.title}</h1>
                    <p className="text-gray-600 dark:text-gray-300">{course.short_description}</p>
                </div>

                {/* Imagen */}
                <img
                    src={course.thumbnail_url || '/images/default-course.jpg'}
                    alt={course.title}
                    className="max-h-[400px] w-full rounded-xl object-cover shadow-md"
                />

                {/* Información del curso */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Información del curso</h2>
                        <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">{course.description}</p>

                        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                            <p>
                                <strong>Duración:</strong> {course.duration_minutes ?? 'Variable'} minutos
                            </p>
                            <p>
                                <strong>Nivel:</strong> {course.level}
                            </p>
                            <p>
                                <strong>Categoría:</strong> {course.category?.name}
                            </p>
                            <p>
                                <strong>Instructor:</strong> {course.user?.name}
                            </p>
                            <p>
                                <strong>Precio:</strong> ${course.price}
                            </p>
                        </div>
                    </div>

                    {/* Tarjeta lateral */}
                    <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
                        <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">¿Quieres inscribirte?</h3>

                        {!is_enrolled ? (
                            <button
                                disabled={processing}
                                onClick={handleEnrollment}
                                className="rounded-lg bg-green-600 px-6 py-2 text-white hover:bg-green-700"
                            >
                                {processing ? 'Inscribiendo...' : 'Inscribirme al curso'}
                            </button>
                        ) : (
                            <div className="rounded-lg border border-green-300 bg-green-100 p-4 text-green-800">Ya estás inscrito en este curso.</div>
                        )}

                        <Link href={route('courses.index')} className="mt-4 block text-center text-sm text-gray-500 hover:text-gray-700">
                            Volver a cursos
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
