import BaseModal from "../../../admin/components/BaseModal.jsx";

const LessonModal = ({
                         isOpen,
                         onClose,
                         onSubmit,
                         formData,
                         setFormData,
                         mode = "create"
                     }) => {
    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title={mode === "create" ? "Add Lesson" : "Edit Lesson"}
        >
            <div className="space-y-4">

                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                            setFormData(prev => ({ ...prev, title: e.target.value }))
                        }
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="e.g. Welcome to the course"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Description
                        <span className="text-gray-400 font-normal ml-1">(optional)</span>
                    </label>
                    <textarea
                        value={formData.description}
                        onChange={(e) =>
                            setFormData(prev => ({ ...prev, description: e.target.value }))
                        }
                        className="w-full border rounded-lg px-3 py-2 resize-none"
                        rows={3}
                        placeholder="Brief description of this lesson"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Type</label>
                    {mode === "edit" ? (
                        <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500 capitalize">
                            {formData.lessonType === "exam" ? "📋 Exam" : "📄 Lesson"} — locked after creation
                        </div>
                    ) : (
                    <div className="flex gap-2">
                        {["lesson", "exam"].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFormData(prev => ({ ...prev, lessonType: type }))}
                                className={`flex-1 rounded-lg border py-2 text-sm font-medium transition ${
                                    formData.lessonType === type
                                        ? "border-violet-300 bg-violet-50 text-violet-700"
                                        : "border-gray-200 bg-gray-50 text-gray-500 hover:border-violet-200"
                                }`}
                            >
                                {type === "lesson" ? "📄 Lesson" : "📋 Exam"}
                            </button>
                        ))}
                    </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Sort Order</label>
                    <input
                        type="number"
                        min={0}
                        value={formData.sortOrder}
                        onChange={(e) =>
                            setFormData(prev => ({ ...prev, sortOrder: Number(e.target.value) }))
                        }
                        className="w-full border rounded-lg px-3 py-2"
                    />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSubmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                        {mode === "create" ? "Create Lesson" : "Update Lesson"}
                    </button>
                </div>
            </div>
        </BaseModal>
    );
};

export default LessonModal;