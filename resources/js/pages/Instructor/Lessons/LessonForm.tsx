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
            className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn"
        >
            {/* Image upload box */}
            <div className="flex flex-col items-center justify-center border-2 border-gray-200 border-dashed rounded-xl h-64 bg-gray-50 hover:bg-gray-100 transition">
                <button
                    type="button"
                    className="w-10 h-10 rounded-full bg-green-200 hover:bg-green-300 flex items-center justify-center transition"
                >
                    <span className="text-green-700 text-xl">⬆</span>
                </button>
            </div>

            {/* Right side form */}
            <div className="flex flex-col space-y-4">
                <input
                    className="w-full border border-green-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 focus:outline-none transition"
                    placeholder="Título"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                />

                <textarea
                    className="w-full border border-green-300 rounded-lg p-3 h-40 resize-none focus:ring-2 focus:ring-green-400 focus:outline-none transition"
                    placeholder="Descripción..."
                    value={data.content_text}
                    onChange={(e) => setData("content_text", e.target.value)}
                />

                <button
                    disabled={processing}
                    className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg shadow-md transition-transform hover:scale-[1.02]"
                >
                    Subir
                </button>
            </div>
        </form>
    );
}

// tailwind animation
// Add this to your global CSS if needed:
// .animate-fadeIn { animation: fadeIn .4s ease-in-out; }
// @keyframes fadeIn {
//   from { opacity: 0; transform: translateY(5px); }
//   to { opacity: 1; transform: translateY(0); }
// }

