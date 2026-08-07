import { BookOpen, Plus, RefreshCw } from "lucide-react";
import CourseTableRow from "./CourseTableRow";

const CourseTable = ({
                         courses = [],
                         loading = false,
                         onManageOffering,
                         onManageContent,
                         onEdit,
                         onDelete,
                         onToggleActive,
                         onAdd,
                     }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800">
                        Courses ({courses.length})
                    </h2>
                    <div className="text-sm text-gray-500">
                        {courses.length} total courses
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="p-12 text-center">
                    <RefreshCw className="w-8 h-8 animate-spin mx-auto text-gray-400" />
                    <p className="text-gray-500 mt-2">Loading courses...</p>
                </div>
            ) : courses.length === 0 ? (
                <div className="p-12 text-center">
                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-500 mb-2">No courses yet</h3>
                    <p className="text-gray-400 mb-4">Create your first course to get started.</p>
                    {onAdd && (
                        <button
                            onClick={onAdd}
                            className="bg-gradient-to-r from-slate-600 to-blue-600 text-white px-6 py-3 rounded-lg"
                        >
                            <Plus className="w-5 h-5 inline mr-2" />
                            Add First Course
                        </button>
                    )}
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">ID</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Title</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Price</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {courses.map((course) => (
                            <CourseTableRow
                                key={course.id}
                                course={course}
                                onManageOffering={onManageOffering}
                                onManageContent={onManageContent}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                onToggleActive={onToggleActive}
                            />
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CourseTable;