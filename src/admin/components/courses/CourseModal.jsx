// CourseModal.jsx
import BaseModal from "../BaseModal.jsx";

const CourseModal = ({
                         isOpen,
                         onClose,
                         onSubmit,
                         formData,
                         setFormData,
                         mode = "create",
                         categories = [],
                     }) => {
    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title={mode === "create" ? "Add Course" : "Edit Course"}
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
                        placeholder="e.g. React Fundamentals"
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
                        placeholder="Short course description"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                        value={formData.categoryId ?? ""}
                        onChange={(e) =>
                            setFormData(prev => ({
                                ...prev,
                                categoryId: e.target.value ? Number(e.target.value) : null,
                            }))
                        }
                        className="w-full border rounded-lg px-3 py-2"
                    >
                        <option value="">— No category —</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Price (Rp)</label>
                        <input
                            type="number"
                            min={0}
                            step={1000}
                            value={formData.price ?? ""}
                            onChange={(e) =>
                                setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))
                            }
                            className="w-full border rounded-lg px-3 py-2"
                            placeholder="e.g. 150000"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Duration (mins)</label>
                        <input
                            type="number"
                            min={0}
                            value={formData.duration ?? ""}
                            onChange={(e) =>
                                setFormData(prev => ({ ...prev, duration: Number(e.target.value) }))
                            }
                            className="w-full border rounded-lg px-3 py-2"
                            placeholder="0"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Rating
                            <span className="ml-1 text-xs text-gray-400 font-normal">(0.00 – 5.00)</span>
                        </label>
                        <input
                            type="number"
                            min={0}
                            max={5}
                            step={0.01}
                            value={formData.rating ?? ""}
                            onChange={(e) => {
                                const val = parseFloat(e.target.value);
                                setFormData(prev => ({
                                    ...prev,
                                    rating: isNaN(val) ? null : Math.min(5, Math.max(0, val)),
                                }));
                            }}
                            className="w-full border rounded-lg px-3 py-2"
                            placeholder="e.g. 4.50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Image URL</label>
                        <input
                            type="text"
                            value={formData.image ?? ""}
                            onChange={(e) =>
                                setFormData(prev => ({ ...prev, image: e.target.value }))
                            }
                            className="w-full border rounded-lg px-3 py-2"
                            placeholder="https://..."
                        />
                    </div>
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
                        {mode === "create" ? "Create Course" : "Update Course"}
                    </button>
                </div>
            </div>
        </BaseModal>
    );
};

export default CourseModal;