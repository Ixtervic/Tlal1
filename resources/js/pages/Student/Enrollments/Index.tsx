import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Course } from '@/types/Course'; // Mantener si CourseCard lo necesita o definir Enrollment
import { Head, Link } from '@inertiajs/react';

// Define el tipo para Enrollment si lo tienes definido en otro lugar.
// Si no, puedes mantener 'any' o definir una interfaz simple aquí.
interface Enrollment {
    id: number;
    progress_percent: number;
    course_id: number;
    course: Course; // Asumiendo que 'course' dentro de enrollment es del tipo Course
}

interface Props {
    enrollments: Enrollment[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cursos',
        href: '/student/enrollments', // Ajusta la ruta si es necesario
    },
    {
        title: 'Mis inscripciones',
        href: '/student/enrollments', // Ajusta la ruta si es necesario
    },
];

export default function Index({ enrollments }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* Se mantienen las clases de fondo y espaciado del Index del instructor */}
            <div className="min-h-screen bg-gray-50 px-6 py-10 dark:bg-gray-900">
                <Head title="Mis cursos inscritos" />

                <div className="mx-auto max-w-7xl">
                    {/* Estilo del encabezado y botón 'Nuevo Curso' del Index del instructor */}
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        {/* Se mantiene el título con el estilo del instructor */}
                        <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">Mis Cursos Inscritos</h1>

                        {/* El botón 'Nuevo Curso' se puede adaptar a 'Ver Catálogo' o eliminar, 
                            dependiendo de si quieres que el estudiante pueda navegar fácilmente.
                            En este ejemplo, se cambia a un enlace más genérico. */}
                        <Link
                            href={route('courses.index')} // Ruta al catálogo de cursos
                            className="inline-flex transform items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:scale-105 hover:bg-indigo-700"
                        >
                            Ver Catálogo
                        </Link>
                    </div>

                    {enrollments.length === 0 ? (
                        <p className="text-gray-600">Aún no estás inscrito en ningún curso.</p>
                    ) : (
                        <div className="space-y-4">
                            {enrollments.map((enrollment: any) => (
                                <div key={enrollment.id} className="flex items-center justify-between rounded-lg border p-4">
                                    <div>
                                        <h2 className="text-lg font-bold">{enrollment.course.title}</h2>
                                        <p className="text-sm text-gray-500">Progreso: {enrollment.progress_percent}%</p>
                                    </div>

                                    <Link href={route('courses.show', enrollment.course_id)} className="rounded-lg bg-green-600 px-4 py-2 text-white">
                                        Ver curso
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
