import React from "react";
import {
    Eye,
    Edit3,
    Trash2,
    User,
    Mail,
    ShieldCheck,
    Power
} from "lucide-react";

const roleColors = {
    admin: "bg-purple-100 text-purple-700",
    instructor: "bg-blue-100 text-blue-700",
    student: "bg-gray-100 text-gray-700"
};

const UserTableRow = ({
                          user,
                          onView,
                          onEdit,
                          onDelete,
                          onToggleActive,
                          formatDate
                      }) => {
    return (
        <tr className="hover:bg-gray-50">
            {/* ID */}
            <td className="px-6 py-4">
                <span className="text-sm font-mono text-gray-600">
                    {user.displayId || `#${user.id}`}
                </span>
            </td>

            {/* Username */}
            <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">
                        {user.username}
                    </span>
                </div>
            </td>

            {/* Email */}
            <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900">
                        {user.email || "No email"}
                    </span>
                </div>
            </td>

            {/* Role */}
            <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-gray-400" />
                    <span className={`text-xs px-2 py-1 rounded ${roleColors[user.role] || "bg-gray-100"}`}>
                        {user.role}
                    </span>
                </div>
            </td>

            {/* Status */}
            <td className="px-6 py-4">
                <div className="flex flex-col space-y-1">
                    <span className={`text-xs px-2 py-1 rounded w-fit ${user.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {user.isActive ? "Active" : "Inactive"}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded w-fit ${user.isEmailVerified ? "bg-blue-100 text-blue-700" : "bg-gray-200 text-gray-600"}`}>
                        {user.isEmailVerified ? "Verified" : "Unverified"}
                    </span>
                </div>
            </td>

            {/* Created */}
            <td className="px-6 py-4 text-sm text-gray-900">
                {formatDate(user.createdAt)}
            </td>

            {/* Last Login */}
            <td className="px-6 py-4 text-sm text-gray-900">
                {formatDate(user.lastLoginAt)}
            </td>

            {/* Actions */}
            <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => onView(user)}
                        className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50"
                    >
                        <Eye className="w-4 h-4" />
                    </button>

                    <button
                        onClick={() => onEdit(user)}
                        className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50"
                    >
                        <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                        onClick={() => onToggleActive(user.id)}
                        className="text-yellow-600 hover:text-yellow-800 p-2 rounded-lg hover:bg-yellow-50"
                    >
                        <Power className="w-4 h-4" />
                    </button>

                    <button
                        onClick={() => onDelete(user.id)}
                        className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default UserTableRow;