import BaseModal from "../../BaseModal.jsx";

const CourseDetailModal = ({
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
            title={mode === "create" ? "Add Course Detail" : "Edit Course Detail"}
        >
            <div className="space-y-4">

                <div>
                    <label className="block text-sm font-medium mb-1">Hero Image URL</label>
                    <input
                        type="text"
                        value={formData.heroImage ?? ""}
                        onChange={e => setFormData(p => ({ ...p, heroImage: e.target.value }))}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="https://..."
                    />
                    {formData.heroImage && (
                        <img
                            src={formData.heroImage}
                            alt="Preview"
                            className="mt-2 h-32 w-full object-cover rounded-lg border"
                            onError={e => e.target.style.display = "none"}
                        />
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Short Description</label>
                    <textarea
                        value={formData.shortDescription ?? ""}
                        onChange={e => setFormData(p => ({ ...p, shortDescription: e.target.value }))}
                        className="w-full border rounded-lg px-3 py-2 resize-none"
                        rows={3}
                        placeholder="Brief overview of the course..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Tools Required</label>
                    <input
                        type="text"
                        value={formData.toolsRequired ?? ""}
                        onChange={e => setFormData(p => ({ ...p, toolsRequired: e.target.value }))}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="Node.js, VS Code, Chrome DevTools"
                    />
                    <p className="text-xs text-gray-400 mt-1">Comma-separated</p>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Full Description</label>
                    <textarea
                        value={formData.fullDescriptionHtml ?? ""}
                        onChange={e => setFormData(p => ({ ...p, fullDescriptionHtml: e.target.value }))}
                        className="w-full border rounded-lg px-3 py-2 resize-none"
                        rows={6}
                        placeholder="Detailed course description..."
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
                        disabled={saving}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50"
                    >
                        {saving ? "Saving..." : mode === "create" ? "Create" : "Update"}
                    </button>
                </div>
            </div>
        </BaseModal>
    );
};

export default CourseDetailModal;