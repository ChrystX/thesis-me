import BaseModal from "../BaseModal.jsx";

const CategoryModal = ({
                           isOpen,
                           onClose,
                           onSubmit,
                           formData,
                           setFormData,
                           mode = "create",
                       }) => {
    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title={mode === "create" ? "Add Category" : "Edit Category"}
        >
            <div className="space-y-4">

                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        type="text"
                        value={formData.name ?? ""}
                        onChange={(e) =>
                            setFormData(prev => ({ ...prev, name: e.target.value }))
                        }
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="e.g. Web Development"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        value={formData.description ?? ""}
                        onChange={(e) =>
                            setFormData(prev => ({ ...prev, description: e.target.value }))
                        }
                        className="w-full border rounded-lg px-3 py-2 resize-none"
                        rows={3}
                        placeholder="Short category description"
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
                        {mode === "create" ? "Create Category" : "Update Category"}
                    </button>
                </div>
            </div>
        </BaseModal>
    );
};

export default CategoryModal;