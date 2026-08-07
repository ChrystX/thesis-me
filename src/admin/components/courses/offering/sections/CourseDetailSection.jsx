import { FileText, Edit3, Trash2, Plus } from "lucide-react";
import { Wrench } from "lucide-react";

const CourseDetailSection = ({ detail, loading, onAdd, onEdit, onDelete }) => {
    const toolsArray = detail?.toolsRequired
        ? detail.toolsRequired.split(",").map(t => t.trim()).filter(Boolean)
        : [];

    if (loading) return (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center text-gray-400">
            Loading...
        </div>
    );

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-500" />
                    <h2 className="text-lg font-bold text-gray-800">Course Detail</h2>
                </div>
                {detail ? (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onDelete}
                            className="flex items-center gap-1 text-sm px-3 py-1.5 text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
                        >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                        <button
                            onClick={onEdit}
                            className="flex items-center gap-1 text-sm px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            <Edit3 className="w-3.5 h-3.5" /> Edit
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={onAdd}
                        className="flex items-center gap-1 text-sm px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        <Plus className="w-3.5 h-3.5" /> Add Detail
                    </button>
                )}
            </div>

            {detail ? (
                <div className="p-6 space-y-6">
                    {detail.heroImage && (
                        <img
                            src={detail.heroImage}
                            alt="Hero"
                            className="h-48 w-full object-cover rounded-lg border"
                            onError={e => e.target.style.display = "none"}
                        />
                    )}

                    {detail.shortDescription && (
                        <div>
                            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
                                Short Description
                            </p>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                {detail.shortDescription}
                            </p>
                        </div>
                    )}

                    {toolsArray.length > 0 && (
                        <div>
                            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2 flex items-center gap-1">
                                <Wrench className="w-3.5 h-3.5" /> Tools Required
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {toolsArray.map((tool, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1.5 rounded-full bg-gray-50 text-gray-700 text-xs border border-gray-200 font-medium"
                                    >
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {detail.fullDescriptionHtml && (
                        <div>
                            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
                                Full Description
                            </p>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                {detail.fullDescriptionHtml}
                            </p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="p-12 text-center">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">No detail record yet.</p>
                    <p className="text-gray-400 text-xs mt-1">Click "Add Detail" to create one.</p>
                </div>
            )}
        </div>
    );
};

export default CourseDetailSection;