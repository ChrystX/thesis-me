import { Users, Plus, Trash2 } from "lucide-react";

const CourseInstructorSection = ({ instructors, loading, onOpen, onUnassign }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-indigo-500" />
                    <h2 className="text-lg font-bold text-gray-800">
                        Instructors ({instructors.length})
                    </h2>
                </div>
                <button
                    onClick={onOpen}
                    className="flex items-center gap-1 text-sm px-4 py-1.5 bg-gradient-to-r from-slate-600 to-blue-600 text-white rounded-lg hover:from-slate-700 hover:to-blue-700"
                >
                    <Plus className="w-4 h-4" /> Manage
                </button>
            </div>

            {loading ? (
                <div className="p-8 text-center text-gray-400 text-sm">Loading...</div>
            ) : instructors.length === 0 ? (
                <div className="p-12 text-center">
                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-500 mb-2">No instructors assigned</h3>
                    <p className="text-gray-400 mb-4">Assign instructors to this course.</p>
                    <button
                        onClick={onOpen}
                        className="bg-gradient-to-r from-slate-600 to-blue-600 text-white px-6 py-3 rounded-lg"
                    >
                        <Plus className="w-5 h-5 inline mr-2" />
                        Assign Instructor
                    </button>
                </div>
            ) : (
                <div className="divide-y divide-gray-100">
                    {instructors.map(i => (
                        <div key={i.instructorId} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-sm font-medium">
                                    {i.name?.charAt(0) ?? "?"}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{i.name}</p>
                                    {i.instructorType && (
                                        <p className="text-xs text-gray-400">{i.instructorType}</p>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={() => onUnassign(i.instructorId)}
                                className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CourseInstructorSection;