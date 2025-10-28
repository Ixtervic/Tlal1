import CourseCard from '@/components/CourseCard';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Course } from '@/types/Course';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

interface Props {
    courses: Course[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Instructor',
        href: '/instructor/courses',
    },
    {
        title: 'Mis cursos',
        href: '/instructor/courses',
    },
];

export default function Index({ courses }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="min-h-screen bg-gray-50 px-6 py-10 dark:bg-gray-900">
                <Head title="Mis cursos" />

                <div className="mx-auto max-w-7xl">
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Mis Cursos</h1>

                        <Link
                            href={route('instructor.courses.create')}
                            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
                        >
                            <Plus size={18} /> Nuevo Curso
                        </Link>
                    </div>

                    {courses.length === 0 ? (
                        <p className="text-center text-gray-500">Aún no tienes cursos creados. Crea uno nuevo para empezar.</p>
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
