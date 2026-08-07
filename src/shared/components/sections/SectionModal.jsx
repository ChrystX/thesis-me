import BaseModal from "../../../admin/components/BaseModal.jsx";

const SectionModal = ({
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
            title={mode === "create" ? "Add Section" : "Edit Section"}
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
                        placeholder="e.g. Introduction"
                    />
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

                <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select
                        value={formData.isActive}
                        onChange={(e) =>
                            setFormData(prev => ({ ...prev, isActive: e.target.value === "true" }))
                        }
                        className="w-full border rounded-lg px-3 py-2"
                    >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
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
                        {mode === "create" ? "Create Section" : "Update Section"}
                    </button>
                </div>
            </div>
        </BaseModal>
    );
};

export default SectionModal;