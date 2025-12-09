import { useForm } from "@inertiajs/react";

export default function LessonForm({ moduleId }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        slug: "",
        content_text: "",
        duration_seconds: "",
        is_required: true,
    });

    const submit = (e) => {
        e.preventDefault();
        post(`/modules/${moduleId}/lessons`, {
            onSuccess: () => reset(),
        });
    };

    return (
        <form
            onSubmit={submit}
            className="border p-3 rounded bg-white shadow-sm space-y-3"
        >
            <h4 className="font-semibold">Añadir lección</h4>

            <input
                className="w-full border rounded p-2"
                placeholder="Título"
                value={data.title}
                onChange={(e) => setData("title", e.target.value)}
            />

            <input
                className="w-full border rounded p-2"
                placeholder="Slug"
                value={data.slug}
                onChange={(e) => setData("slug", e.target.value)}
            />

            <textarea
                className="w-full border rounded p-2"
                placeholder="Contenido"
                value={data.content_text}
                onChange={(e) => setData("content_text", e.target.value)}
            />

            <input
                type="number"
                className="w-full border rounded p-2"
                placeholder="Duración (segundos)"
                value={data.duration_seconds}
                onChange={(e) => setData("duration_seconds", e.target.value)}
            />

            <button
                disabled={processing}
                className="bg-blue-600 text-white px-3 py-1 rounded"
            >
                Guardar lección
            </button>
        </form>
    );
}
