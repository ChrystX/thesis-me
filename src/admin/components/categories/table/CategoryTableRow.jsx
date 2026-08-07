import { Edit3, Trash2 } from "lucide-react";

const CategoryTableRow = ({ category, onEdit, onDelete }) => {
    return (
        <tr className="hover:bg-gray-50">
            <td className="px-6 py-4">
                <span className="text-sm font-mono text-gray-500">#{category.id}</span>
            </td>

            <td className="px-6 py-4">
                <span className="text-sm font-medium text-gray-900">{category.name}</span>
            </td>

            <td className="px-6 py-4">
                <span className="text-sm text-gray-500">
                    {category.description ?? "—"}
                </span>
            </td>

            <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => onEdit(category)}
                        className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50"
                    >
                        <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(category.id)}
                        className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default CategoryTableRow;