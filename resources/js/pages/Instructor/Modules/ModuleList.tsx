import ModuleForm from "./ModuleForm";

export default function ModuleList({ modules, courseId }) {
    return (
        <div className="space-y-4">
            <ModuleForm courseId={courseId} />

            {modules.map((mod) => (
                <div key={mod.id} className="border rounded p-3 bg-gray-50">
                    <h3 className="font-semibold">{mod.title}</h3>
                    <p className="text-gray-600 text-sm">{mod.description}</p>
                </div>
            ))}
        </div>
    );
}
