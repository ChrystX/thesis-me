import { HelpCircle, Edit3, Trash2, Plus, RefreshCw } from "lucide-react";

const CourseFaqSection = ({ faqs, loading, onAdd, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-yellow-500" />
                    <h2 className="text-lg font-bold text-gray-800">
                        FAQs ({faqs.length})
                    </h2>
                </div>
                <button
                    onClick={onAdd}
                    className="flex items-center gap-1 text-sm px-4 py-1.5 bg-gradient-to-r from-slate-600 to-blue-600 text-white rounded-lg hover:from-slate-700 hover:to-blue-700"
                >
                    <Plus className="w-4 h-4" /> Add FAQ
                </button>
            </div>

            {loading ? (
                <div className="p-12 text-center">
                    <RefreshCw className="w-8 h-8 animate-spin mx-auto text-gray-400" />
                    <p className="text-gray-500 mt-2">Loading FAQs...</p>
                </div>
            ) : faqs.length === 0 ? (
                <div className="p-12 text-center">
                    <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-500 mb-2">No FAQs yet</h3>
                    <p className="text-gray-400 mb-4">Add your first FAQ for this course.</p>
                    <button
                        onClick={onAdd}
                        className="bg-gradient-to-r from-slate-600 to-blue-600 text-white px-6 py-3 rounded-lg"
                    >
                        <Plus className="w-5 h-5 inline mr-2" />
                        Add First FAQ
                    </button>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">#</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Question</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Answer</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {[...faqs]
                            .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
                            .map(faq => (
                                <tr key={faq.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                            <span className="text-sm font-mono text-gray-500">
                                                {faq.sortOrder ?? 0}
                                            </span>
                                    </td>
                                    <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-gray-900">
                                                {faq.question}
                                            </span>
                                    </td>
                                    <td className="px-6 py-4 max-w-xs">
                                            <span className="text-sm text-gray-500 line-clamp-2">
                                                {faq.answer ?? "—"}
                                            </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => onEdit(faq)}
                                                className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50"
                                            >
                                                <Edit3 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => onDelete(faq.id)}
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

export default CourseFaqSection;