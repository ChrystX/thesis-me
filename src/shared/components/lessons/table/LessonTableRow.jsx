import React from "react";
import { Edit3, Trash2, PenLine, ClipboardList } from "lucide-react";

const LessonTableRow = ({
                            lesson,
                            onOpenEditor,
                            onEdit,
                            onDelete,
                        }) => {
    const isExam = lesson.lessonType === "exam";

    return (
        <tr className="hover:bg-gray-50">
            {/* Sort Order */}
            <td className="px-6 py-4">
                <span className="text-sm font-mono text-gray-500">{lesson.sortOrder}</span>
            </td>

            {/* Title */}
            <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">{lesson.title}</span>
                    {isExam && (
                        <span className="rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-xs font-medium text-violet-600">
                            Exam
                        </span>
                    )}
                </div>
            </td>

            {/* Description */}
            <td className="px-6 py-4">
                <span className="text-sm text-gray-500 line-clamp-1">
                    {lesson.description || <span className="italic text-gray-300">No description</span>}
                </span>
            </td>

            {/* Actions */}
            <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => onOpenEditor(lesson)}
                        className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium ${
                            isExam
                                ? "text-violet-600 hover:text-violet-800 hover:bg-violet-50"
                                : "text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        }`}
                    >
                        {isExam ? <ClipboardList className="w-4 h-4" /> : <PenLine className="w-4 h-4" />}
                        <span>{isExam ? "Open Exam" : "Open Editor"}</span>
                    </button>

                    <button
                        onClick={() => onEdit(lesson)}
                        className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50"
                    >
                        <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                        onClick={() => onDelete(lesson.id)}
                        className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default LessonTableRow;