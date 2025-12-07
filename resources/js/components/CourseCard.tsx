import { Course } from '@/types/Course';
import { Link } from '@inertiajs/react';

interface Props {
    course: Course;
    canEdit?: boolean;
    canDelete?: boolean;
}

export default function CourseCard({ course, canEdit, canDelete }: Props) {
    return (
        <div className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-lg dark:bg-green-100">
            <img src={course.thumbnail_url || '/images/default-course.jpg'} alt={course.title} className="h-48 w-full object-cover" />
            <div className="space-y-2 p-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{course.title}</h3>
                <p className="line-clamp-2 text-sm text-gray-500 dark:text-gray-400">{course.short_description || 'Sin descripción'}</p>
                <div className="mt-2 flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                    <span>{course.level === 'beginner' ? '🟢 Principiante' : course.level === 'intermediate' ? '🟡 Intermedio' : '🔴 Avanzado'}</span>
                    <span>{course.duration_minutes ? `${course.duration_minutes} min` : 'Duración variable'}</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                    <span className="font-bold text-green-600">${course.price}</span>
                    <span className="text-sm text-gray-500">por {course.user?.name}</span>
                </div>
                <div className="mt-3 flex gap-2">
                    <Link href={route('courses.show', course.id)} className="rounded-lg bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700">
                        Ver detalles
                    </Link>
                    {canEdit && (
                        <Link
                            href={route('courses.edit', course.id)}
                            className="rounded-lg bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                        >
                            Editar
                        </Link>
                    )}
                    {canDelete && (
                        <Link
                            href={route('courses.destroy', course.id)}
                            method="delete"
                            as="button"
                            className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                        >
                            Eliminar
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
