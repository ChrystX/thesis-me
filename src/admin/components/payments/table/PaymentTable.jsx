import { CreditCard, RefreshCw } from "lucide-react";
import PaymentTableRow from "./PaymentTableRow.jsx";
import PaymentTableFilters from "./PaymentTableFilters.jsx";

const PaymentTable = ({
                          payments = [],
                          loading = false,
                          error = null,
                          filters = {},
                          onFilterChange,
                          onResetFilters,
                          onViewDetail,
                      }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800">
                        Transactions ({payments.length})
                    </h2>
                </div>

                <PaymentTableFilters
                    filters={filters}
                    onFilterChange={onFilterChange}
                    onReset={onResetFilters}
                />
            </div>

            {loading ? (
                <div className="p-12 text-center">
                    <RefreshCw className="w-8 h-8 animate-spin mx-auto text-gray-400" />
                    <p className="text-gray-500 mt-2">Loading transactions...</p>
                </div>
            ) : error ? (
                <div className="p-12 text-center">
                    <p className="text-red-500">{error}</p>
                </div>
            ) : payments.length === 0 ? (
                <div className="p-12 text-center">
                    <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-500 mb-2">No transactions found</h3>
                    <p className="text-gray-400">Try adjusting your filters.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {payments.map((payment, index) => (
                            <PaymentTableRow
                                key={payment.id}
                                payment={payment}
                                index={index + 1}
                                onViewDetail={onViewDetail}
                            />
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PaymentTable;