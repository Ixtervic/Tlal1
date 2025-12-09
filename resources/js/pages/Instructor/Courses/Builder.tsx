import ModuleList from "../Modules/ModuleList";
import LessonList from "../Lessons/LessonList";

export default function Builder({ course }) {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
                Editor del Curso: {course.title}
            </h1>

            <div className="grid grid-cols-2 gap-6">

                {/* Left side: Modules */}
                <div>
                    <h2 className="text-xl font-bold mb-3">Módulos</h2>
                    <ModuleList modules={course.modules} courseId={course.id} />
                </div>

                {/* Right side: Lessons */}
                <div>
                    <h2 className="text-xl font-bold mb-3">Lecciones</h2>
                    <LessonList modules={course.modules} />
                </div>
            </div>
        </div>
    );
}
