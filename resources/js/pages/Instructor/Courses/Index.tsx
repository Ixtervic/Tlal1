import CourseCard from '@/components/CourseCard';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Course } from '@/types/Course';
import { Head } from '@inertiajs/react';

interface Props {
    courses: Course[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cursos',
        href: '/cursos',
    },
];

export default function Index({ courses }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="min-h-screen bg-gray-50 px-6 py-10 dark:bg-gray-900">
                <Head title="Cursos disponibles" />

                <div className="mx-auto max-w-7xl">
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Cursos Actuales</h1>
                    </div>

                    {courses.length === 0 ? (
                        <p className="text-center text-gray-500">No hay cursos publicados de usted ahora mismo.</p>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {courses.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
