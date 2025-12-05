import CourseCard from '@/components/CourseCard';
import SearchBar from '@/components/search-bar';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Course } from '@/types/Course';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

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
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Al cambiar el tema, actualizamos las clases del body
    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className={`min-h-screen px-6 py-10 ${isDarkMode ? 'bg-gray-900' : 'bg-green-50'}`}>
                <Head title="Cursos disponibles" />

                <div className="mx-auto max-w-7xl">
                    {/* Sección de Título y Barra de Búsqueda */}
                    <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Cursos disponibles</h1>

                        {/* Botón para alternar entre tema claro y oscuro */}
                        <button onClick={toggleTheme} className="bg-green-50 text-white hover:bg-green-100 focus:outline-none">
                            {isDarkMode ? '💡' : '🌛'}
                        </button>

                        {/* Barra de búsqueda global */}
                        <div className="w-full sm:w-1/2">
                            <SearchBar />
                        </div>
                    </div>

                    {/* Mensaje si no hay cursos */}
                    {courses.length === 0 ? (
                        <p className="text-center text-gray-500">No hay cursos publicados todavía.</p>
                    ) : (
                        // Contenedor para los cursos
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
