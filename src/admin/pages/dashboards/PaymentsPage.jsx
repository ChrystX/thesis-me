import { CreditCard } from "lucide-react";
import { DashboardHeader } from "../../components/DashboardHeader.jsx";
import PaymentChart from "../../components/payments/chart/PaymentChart.jsx";
import PaymentTable from "../../components/payments/table/PaymentTable.jsx";
import { useAdminPayments } from "../../../hooks/useAdminPayments.js";
import PaymentStatsCards from "../../components/payments/PaymentStatsCards.jsx";


const PaymentsPage = () => {
    const {
        payments,
        loading,
        error,
        filters,
        updateFilter,
        resetFilters,
        refetch,
    } = useAdminPayments();

    return (
        <div className="max-w-7xl mx-auto px-4 space-y-6">
            <DashboardHeader
                title="Payments"
                subtitle="Monitor transactions and revenue"
                icon={CreditCard}
                onRefresh={refetch}
                loading={loading}
            />

            <PaymentStatsCards payments={payments} />

            <PaymentChart payments={payments} />

            <PaymentTable
                payments={payments}
                loading={loading}
                error={error}
                filters={filters}
                onFilterChange={updateFilter}
                onResetFilters={resetFilters}
            />
        </div>
    );
};

export default PaymentsPage;