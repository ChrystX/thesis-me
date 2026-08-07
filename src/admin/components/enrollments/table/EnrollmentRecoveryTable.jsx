import { AlertTriangle, RefreshCw } from "lucide-react";
import EnrollmentRecoveryTableRow from "./EnrollmentRecoveryTableRow.jsx";

const EnrollmentRecoveryTable = ({
                                     records = [],
                                     loading = false,
                                     onRecover,
                                 }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800">
                        Missing Enrollments ({records.length})
                    </h2>
                    <div className="text-sm text-gray-500">
                        {records.length} pending recovery
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="p-12 text-center">
                    <RefreshCw className="w-8 h-8 animate-spin mx-auto text-gray-400" />
                    <p className="text-gray-500 mt-2">Checking enrollments...</p>
                </div>
            ) : records.length === 0 ? (
                <div className="p-12 text-center">
                    <AlertTriangle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-500 mb-2">All clear</h3>
                    <p className="text-gray-400">All successful payments are enrolled correctly.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">ID</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Student</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Course</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Order ID</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Payment Date</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Action</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {records.map((record) => (
                            <EnrollmentRecoveryTableRow
                                key={record.id}
                                record={record}
                                onRecover={onRecover}
                            />
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default EnrollmentRecoveryTable;