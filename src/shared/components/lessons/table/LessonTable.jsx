import { BookOpen, Plus, RefreshCw } from "lucide-react";
import LessonTableRow from "./LessonTableRow.jsx";

const LessonTable = ({
                         lessons = [],
                         loading = false,
                         onOpenEditor,
                         onEdit,
                         onDelete,
                         onAdd,
                     }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800">
                        Lessons ({lessons.length})
                    </h2>
                    <div className="text-sm text-gray-500">
                        {lessons.length} total lessons
                    </div>
                </div>
            </div>

            {/* Loading */}
            {loading ? (
                <div className="p-12 text-center">
                    <RefreshCw className="w-8 h-8 animate-spin mx-auto text-gray-400" />
                    <p className="text-gray-500 mt-2">Loading lessons...</p>
                </div>
            ) : lessons.length === 0 ? (
                /* Empty */
                <div className="p-12 text-center">
                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-500 mb-2">
                        No lessons yet
                    </h3>
                    <p className="text-gray-400 mb-4">
                        Add your first lesson to this section.
                    </p>
                    {onAdd && (
                        <button
                            onClick={() => onAdd()}
                            className="bg-gradient-to-r from-slate-600 to-blue-600 text-white px-6 py-3 rounded-lg"
                        >
                            <Plus className="w-5 h-5 inline mr-2" />
                            Add First Lesson
                        </button>
                    )}
                </div>
            ) : (
                /* Table */
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">#</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Title</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Description</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                        {lessons.map((lesson) => (
                            <LessonTableRow
                                key={lesson.id}
                                lesson={lesson}
                                onOpenEditor={onOpenEditor}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default LessonTable;