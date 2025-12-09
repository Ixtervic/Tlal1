import LessonForm from "./LessonForm";

export default function LessonList({ modules }) {
    return (
        <div className="space-y-6">

            {modules.map((mod) => (
                <div key={mod.id} className="border rounded p-3 bg-white">
                    <h3 className="font-semibold mb-2">
                        {mod.title} — Lecciones
                    </h3>

                    <LessonForm moduleId={mod.id} />

                    <div className="mt-3 space-y-2">
                        {mod.lessons.map((lesson) => (
                            <div key={lesson.id} className="border p-2 rounded bg-gray-50">
                                {lesson.title}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
