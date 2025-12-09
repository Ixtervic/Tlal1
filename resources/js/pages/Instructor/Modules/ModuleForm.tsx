import { useForm } from "@inertiajs/react";

export default function ModuleForm({ courseId }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        description: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(`/courses/${courseId}/modules`, {
            onSuccess: () => reset(),
        });
    };

    return (
        <form
            onSubmit={submit}
            className="border p-3 rounded bg-white shadow-sm space-y-3"
        >
            <h4 className="font-semibold">Añadir módulo</h4>

            <input
                className="w-full border rounded p-2"
                placeholder="Título del módulo"
                value={data.title}
                onChange={(e) => setData("title", e.target.value)}
            />

            <textarea
                className="w-full border rounded p-2"
                placeholder="Descripción"
                value={data.description}
                onChange={(e) => setData("description", e.target.value)}
            />

            {errors.title && <p className="text-red-500">{errors.title}</p>}

            <button
                disabled={processing}
                className="bg-green-600 text-white px-3 py-1 rounded"
            >
                Guardar módulo
            </button>
        </form>
    );
}
