import { Edit3, Trash2, ToggleLeft, ToggleRight, Layout, FolderOpen } from "lucide-react";
import {formatRupiah} from "../utils/currency.js";

const CourseTableRow = ({
                            course,
                            onManageOffering,
                            onManageContent,
                            onEdit,
                            onDelete,
                            onToggleActive,
                        }) => {
    return (
        <tr className="hover:bg-gray-50">
            <td className="px-6 py-4">
                <span className="text-sm font-mono text-gray-500">#{course.id}</span>
            </td>

            <td className="px-6 py-4">
                <div>
                    <span className="text-sm font-medium text-gray-900">{course.title}</span>
                    {course.instructor && (
                        <p className="text-xs text-gray-400 mt-0.5">{course.instructor}</p>
                    )}
                </div>
            </td>

            <td className="px-6 py-4">
                <span className="text-sm text-gray-700">
                    {formatRupiah(course.price)}
                </span>
            </td>

            <td className="px-6 py-4">
                <span className={`text-xs px-2 py-1 rounded inline-block ${
                    course.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                }`}>
                    {course.isActive ? "Active" : "Inactive"}
                </span>
            </td>

            <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => onManageOffering(course)}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded-lg hover:bg-blue-50 text-sm font-medium"
                    >
                        <Layout className="w-4 h-4" />
                        <span>Offering</span>
                    </button>

                    <button
                        onClick={() => onManageContent(course)}
                        className="flex items-center space-x-1 text-purple-600 hover:text-purple-800 px-3 py-1.5 rounded-lg hover:bg-purple-50 text-sm font-medium"
                    >
                        <FolderOpen className="w-4 h-4" />
                        <span>Content</span>
                    </button>

                    <button
                        onClick={() => onToggleActive(course)}
                        className="text-yellow-600 hover:text-yellow-800 p-2 rounded-lg hover:bg-yellow-50"
                        title={course.isActive ? "Deactivate" : "Activate"}
                    >
                        {course.isActive
                            ? <ToggleRight className="w-4 h-4" />
                            : <ToggleLeft className="w-4 h-4" />
                        }
                    </button>

                    <button
                        onClick={() => onEdit(course)}
                        className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50"
                    >
                        <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                        onClick={() => onDelete(course.id)}
                        className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default CourseTableRow;