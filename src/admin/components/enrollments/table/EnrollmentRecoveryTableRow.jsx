import { UserPlus } from "lucide-react";

const EnrollmentRecoveryTableRow = ({ record, onRecover }) => {
    return (
        <tr className="hover:bg-gray-50">
            <td className="px-6 py-4">
                <span className="text-sm font-mono text-gray-500">#{record.id}</span>
            </td>

            <td className="px-6 py-4">
                <div>
                    <span className="text-sm font-medium text-gray-900">{record.student.username}</span>
                    <p className="text-xs text-gray-400 mt-0.5">{record.student.email}</p>
                </div>
            </td>

            <td className="px-6 py-4">
                <span className="text-sm text-gray-700">{record.course.title}</span>
            </td>

            <td className="px-6 py-4">
                <span className="text-sm font-mono text-gray-500">{record.orderId}</span>
            </td>

            <td className="px-6 py-4">
                <span className="text-xs text-gray-400">
                    {new Date(record.createdAt).toLocaleDateString("id-ID", {
                        day: "2-digit", month: "short", year: "numeric"
                    })}
                </span>
            </td>

            <td className="px-6 py-4">
                <button
                    onClick={() => onRecover(record)}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded-lg hover:bg-blue-50 text-sm font-medium"
                >
                    <UserPlus className="w-4 h-4" />
                    <span>Recover</span>
                </button>
            </td>
        </tr>
    );
};

export default EnrollmentRecoveryTableRow;