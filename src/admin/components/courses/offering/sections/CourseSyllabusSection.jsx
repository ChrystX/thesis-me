import { List, Edit3, Trash2, Plus, RefreshCw, Video, Clock, Image } from "lucide-react";

const formatDuration = (mins) => {
    if (!mins) return null;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

const CourseSectionSection = ({ sections, loading, onAdd, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <List className="w-5 h-5 text-orange-500" />
                    <h2 className="text-lg font-bold text-gray-800">
                        Sections ({sections.length})
                    </h2>
                    {sections.length > 0 && (
                        <span className="text-xs text-gray-400 ml-2">
                            Total: {formatDuration(sections.reduce((t, s) => t + (s.durationMinutes || 0), 0))}
                        </span>
                    )}
                </div>
                <button
                    onClick={onAdd}
                    className="flex items-center gap-1 text-sm px-4 py-1.5 bg-gradient-to-r from-slate-600 to-blue-600 text-white rounded-lg hover:from-slate-700 hover:to-blue-700"
                >
                    <Plus className="w-4 h-4" /> Add Section
                </button>
            </div>

            {loading ? (
                <div className="p-12 text-center">
                    <RefreshCw className="w-8 h-8 animate-spin mx-auto text-gray-400" />
                    <p className="text-gray-500 mt-2">Loading sections...</p>
                </div>
            ) : sections.length === 0 ? (
                <div className="p-12 text-center">
                    <List className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-500 mb-2">No sections yet</h3>
                    <p className="text-gray-400 mb-4">Add your first section to structure this course.</p>
                    <button
                        onClick={onAdd}
                        className="bg-gradient-to-r from-slate-600 to-blue-600 text-white px-6 py-3 rounded-lg"
                    >
                        <Plus className="w-5 h-5 inline mr-2" />
                        Add First Section
                    </button>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">#</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Title</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Duration</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Media</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {[...sections]
                            .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
                            .map(section => (
                                <tr key={section.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                            <span className="text-sm font-mono text-gray-500">
                                                {section.sortOrder ?? 0}
                                            </span>
                                    </td>
                                    <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-gray-900">
                                                {section.title}
                                            </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1 text-sm text-gray-500">
                                            <Clock className="w-3.5 h-3.5" />
                                            {formatDuration(section.durationMinutes) ?? "—"}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {section.videoUrl && (
                                            <a
                                                href={section.videoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:text-blue-700"
                                                title="Video"
                                                >
                                                <Video className="w-4 h-4" />
                                            </a>
                                                )}
                                            {section.thumbnailUrl && (
                                                <span className="text-gray-400" title="Thumbnail">
                                                        <Image className="w-4 h-4" />
                                                    </span>
                                            )}
                                            {!section.videoUrl && !section.thumbnailUrl && (
                                                <span className="text-gray-300 text-xs">—</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => onEdit(section)}
                                                className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50"
                                            >
                                                <Edit3 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => onDelete(section.id)}
                                                className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CourseSectionSection;