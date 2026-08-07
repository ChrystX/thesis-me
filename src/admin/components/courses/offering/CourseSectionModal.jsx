import BaseModal from "../../BaseModal.jsx";
import { Video, Clock, Image } from "lucide-react";

const CourseSectionModal = ({
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
            title={mode === "create" ? "Add Section" : "Edit Section"}
        >
            <div className="space-y-4">

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={e => setFormData(p => ({ ...p, title: e.target.value }))}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="e.g. Introduction to React"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Sort Order</label>
                        <input
                            type="number"
                            value={formData.sortOrder}
                            onChange={e => setFormData(p => ({ ...p, sortOrder: e.target.value }))}
                            className="w-full border rounded-lg px-3 py-2"
                            placeholder="1"
                            min={0}
                        />
                        <p className="text-xs text-gray-400 mt-1">Lower numbers appear first</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            <Clock className="w-3.5 h-3.5 inline mr-1" />
                            Duration (mins)
                        </label>
                        <input
                            type="number"
                            value={formData.durationMinutes}
                            onChange={e => setFormData(p => ({ ...p, durationMinutes: e.target.value }))}
                            className="w-full border rounded-lg px-3 py-2"
                            placeholder="30"
                            min={0}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        <Video className="w-3.5 h-3.5 inline mr-1" />
                        Video URL
                    </label>
                    <input
                        type="text"
                        value={formData.videoUrl}
                        onChange={e => setFormData(p => ({ ...p, videoUrl: e.target.value }))}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="https://..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        <Image className="w-3.5 h-3.5 inline mr-1" />
                        Thumbnail URL
                    </label>
                    <input
                        type="text"
                        value={formData.thumbnailUrl}
                        onChange={e => setFormData(p => ({ ...p, thumbnailUrl: e.target.value }))}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="https://..."
                    />
                    {formData.thumbnailUrl && (
                        <img
                            src={formData.thumbnailUrl}
                            alt="Thumbnail preview"
                            className="mt-2 h-20 w-32 object-cover rounded-lg border"
                            onError={e => e.target.style.display = "none"}
                        />
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Content</label>
                    <textarea
                        value={formData.contentHtml}
                        onChange={e => setFormData(p => ({ ...p, contentHtml: e.target.value }))}
                        className="w-full border rounded-lg px-3 py-2 resize-none"
                        rows={5}
                        placeholder="Section description, objectives..."
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
                        disabled={!formData.title.trim() || saving}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50"
                    >
                        {saving ? "Saving..." : mode === "create" ? "Create Section" : "Update Section"}
                    </button>
                </div>
            </div>
        </BaseModal>
    );
};

export default CourseSectionModal;