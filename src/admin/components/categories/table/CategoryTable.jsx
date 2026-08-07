import { Tag, Plus, RefreshCw } from "lucide-react";
import CategoryTableRow from "./CategoryTableRow";

const CategoryTable = ({
                           categories = [],
                           loading = false,
                           onEdit,
                           onDelete,
                           onAdd,
                       }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800">
                        Categories ({categories.length})
                    </h2>
                    <div className="text-sm text-gray-500">
                        {categories.length} total categories
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="p-12 text-center">
                    <RefreshCw className="w-8 h-8 animate-spin mx-auto text-gray-400" />
                    <p className="text-gray-500 mt-2">Loading categories...</p>
                </div>
            ) : categories.length === 0 ? (
                <div className="p-12 text-center">
                    <Tag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-500 mb-2">No categories yet</h3>
                    <p className="text-gray-400 mb-4">Create your first category to get started.</p>
                    {onAdd && (
                        <button
                            onClick={onAdd}
                            className="bg-gradient-to-r from-slate-600 to-blue-600 text-white px-6 py-3 rounded-lg"
                        >
                            <Plus className="w-5 h-5 inline mr-2" />
                            Add First Category
                        </button>
                    )}
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">ID</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Description</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {categories.map((category) => (
                            <CategoryTableRow
                                key={category.id}
                                category={category}
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

export default CategoryTable;