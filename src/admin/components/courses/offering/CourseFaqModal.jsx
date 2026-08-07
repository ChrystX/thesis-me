import BaseModal from "../../BaseModal.jsx";

const CourseFaqModal = ({
                            isOpen,
                            onClose,
                            onSubmit,
                            formData,
                            setFormData,
                            mode = "create",
                            saving,
                        }) => {
    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title={mode === "create" ? "Add FAQ" : "Edit FAQ"}
        >
            <div className="space-y-4">

                <div>
                    <label className="block text-sm font-medium mb-1">Sort Order</label>
                    <input
                        type="number"
                        value={formData.sortOrder}
                        onChange={e => setFormData(p => ({ ...p, sortOrder: Number(e.target.value) }))}
                        className="w-24 border rounded-lg px-3 py-2"
                        min={0}
                    />
                    <p className="text-xs text-gray-400 mt-1">Lower numbers appear first</p>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Question <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={formData.question}
                        onChange={e => setFormData(p => ({ ...p, question: e.target.value }))}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="e.g. Do I need prior experience?"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Answer</label>
                    <textarea
                        value={formData.answer}
                        onChange={e => setFormData(p => ({ ...p, answer: e.target.value }))}
                        className="w-full border rounded-lg px-3 py-2 resize-none"
                        rows={5}
                        placeholder="Provide a clear answer..."
                    />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSubmit}
                        disabled={!formData.question || saving}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50"
                    >
                        {saving ? "Saving..." : mode === "create" ? "Create FAQ" : "Update FAQ"}
                    </button>
                </div>
            </div>
        </BaseModal>
    );
};

export default CourseFaqModal;