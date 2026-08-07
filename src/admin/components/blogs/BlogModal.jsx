import BaseModal from "../BaseModal.jsx";

const BlogModal = ({
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
            title={mode === "create" ? "Add Blog Post" : "Edit Blog Post"}
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
                        placeholder="e.g. Getting Started with React"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Slug</label>
                    <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) =>
                            setFormData(prev => ({ ...prev, slug: e.target.value }))
                        }
                        className="w-full border rounded-lg px-3 py-2 font-mono text-sm"
                        placeholder="e.g. getting-started-with-react"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Summary</label>
                    <textarea
                        value={formData.summary ?? ""}
                        onChange={(e) =>
                            setFormData(prev => ({ ...prev, summary: e.target.value }))
                        }
                        className="w-full border rounded-lg px-3 py-2 resize-none"
                        rows={3}
                        placeholder="Short description shown in blog listings"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Thumbnail URL</label>
                    <input
                        type="text"
                        value={formData.thumbnailUrl ?? ""}
                        onChange={(e) =>
                            setFormData(prev => ({ ...prev, thumbnailUrl: e.target.value }))
                        }
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="https://..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select
                        value={formData.status}
                        onChange={(e) =>
                            setFormData(prev => ({
                                ...prev,
                                status: e.target.value,
                                publishedAt: e.target.value === "published"
                                    ? (prev.publishedAt ?? new Date().toISOString())
                                    : prev.publishedAt,
                            }))
                        }
                        className="w-full border rounded-lg px-3 py-2"
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
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
                        {mode === "create" ? "Create Post" : "Update Post"}
                    </button>
                </div>
            </div>
        </BaseModal>
    );
};

export default BlogModal;