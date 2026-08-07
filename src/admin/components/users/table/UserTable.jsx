import React from "react";
import { User, Plus, RefreshCw } from "lucide-react";
import UserTableRow from "./UserTableRow";

const UserTable = ({
                       users = [],
                       loading = false,
                       onView,
                       onEdit,
                       onDelete,
                       onToggleActive,
                       onAdd,
                       formatDate
                   }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800">
                        Users ({users.length})
                    </h2>
                    <div className="text-sm text-gray-500">
                        {users.length} total users
                    </div>
                </div>
            </div>

            {/* Loading */}
            {loading ? (
                <div className="p-12 text-center">
                    <RefreshCw className="w-8 h-8 animate-spin mx-auto text-gray-400" />
                    <p className="text-gray-500 mt-2">Loading users...</p>
                </div>
            ) : users.length === 0 ? (
                /* Empty */
                <div className="p-12 text-center">
                    <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-500 mb-2">
                        No users available
                    </h3>
                    <p className="text-gray-400 mb-4">
                        Create your first user to get started.
                    </p>
                    {onAdd && (
                        <button
                            onClick={() => onAdd()}
                            className="bg-gradient-to-r from-slate-600 to-blue-600 text-white px-6 py-3 rounded-lg"
                        >
                            <Plus className="w-5 h-5 inline mr-2" />
                            Add First User
                        </button>
                    )}
                </div>
            ) : (
                /* Table */
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">ID</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Username</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Email</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Role</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Created</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Last Login</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <UserTableRow
                                key={user.id}
                                user={user}
                                onView={onView}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                onToggleActive={onToggleActive}
                                formatDate={formatDate}
                            />
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserTable;