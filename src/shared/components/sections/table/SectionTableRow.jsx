import React from "react";
import { Edit3, Trash2, ChevronRight, ToggleLeft, ToggleRight } from "lucide-react";

const SectionTableRow = ({
                             section,
                             onViewLessons,
                             onEdit,
                             onDelete,
                             onToggleActive,
                         }) => {
    return (
        <tr className="hover:bg-gray-50">
            {/* Sort Order */}
            <td className="px-6 py-4">
                <span className="text-sm font-mono text-gray-500">{section.sortOrder}</span>
            </td>

            {/* Title */}
            <td className="px-6 py-4">
                <span className="text-sm font-medium text-gray-900">{section.title}</span>
            </td>

            {/* Active */}
            <td className="px-6 py-4">
                <span
                    className={`text-xs px-2 py-1 rounded w-fit inline-block ${
                        section.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >
                    {section.isActive ? "Active" : "Inactive"}
                </span>
            </td>

            {/* Actions */}
            <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => onViewLessons(section)}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded-lg hover:bg-blue-50 text-sm font-medium"
                    >
                        <span>View Lessons</span>
                        <ChevronRight className="w-4 h-4" />
                    </button>

                    <button
                        onClick={() => onToggleActive(section)}
                        className="text-yellow-600 hover:text-yellow-800 p-2 rounded-lg hover:bg-yellow-50"
                        title={section.isActive ? "Deactivate" : "Activate"}
                    >
                        {section.isActive
                            ? <ToggleRight className="w-4 h-4" />
                            : <ToggleLeft className="w-4 h-4" />
                        }
                    </button>

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
    );
};

export default SectionTableRow;