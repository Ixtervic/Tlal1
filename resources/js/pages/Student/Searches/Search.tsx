import CourseCard from '@/components/CourseCard';
import SearchBar from '@/components/search-bar';
import { Course } from '@/types/Course';
import { Head } from '@inertiajs/react';

interface Props {
    searched: string;
    courses: Course[];
}

export default function Search({ searched, courses }: Props) {
    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10 dark:bg-gray-900">
            <Head title={`Resultados para "${searched}"`} />

            <div className="mx-auto max-w-7xl">
                <h1 className="mb-6 text-3xl font-bold text-gray-800 dark:text-white">Resultados de búsqueda</h1>

                <div className="mb-8">
                    <SearchBar />
                </div>

                {courses.length === 0 ? (
                    <p className="text-center text-gray-500">No se encontraron cursos relacionados con "{searched}".</p>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {courses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
