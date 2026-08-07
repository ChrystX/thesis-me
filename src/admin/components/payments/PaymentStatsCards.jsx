import { CreditCard, CheckCircle, Clock, XCircle, TrendingUp } from "lucide-react";

const PaymentStatsCards = ({ payments = [] }) => {
    const settled = payments.filter(p => p.status === "Success");
    const pending = payments.filter(p => p.status === "Pending");
    const failed  = payments.filter(p => p.status === "Failed" || p.status === "Expired");

    const totalRevenue  = settled.reduce((sum, p) => sum + p.amount, 0);
    const avgOrderValue = settled.length
        ? totalRevenue / settled.length
        : 0;

    const fmt = (n) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(n);

    const cards = [
        {
            title: "Total Transactions",
            value: payments.length,
            icon: CreditCard,
            color: "text-blue-500",
        },
        {
            title: "Total Revenue",
            value: fmt(totalRevenue),
            icon: TrendingUp,
            color: "text-green-500",
            sub: `${settled.length} settled`,
        },
        {
            title: "Avg. Order Value",
            value: fmt(avgOrderValue),
            icon: TrendingUp,
            color: "text-indigo-500",
            sub: "settled only",
        },
        {
            title: "Pending",
            value: pending.length,
            icon: Clock,
            color: "text-yellow-500",
            sub: "awaiting payment",
        },
        {
            title: "Failed / Expired",
            value: failed.length,
            icon: XCircle,
            color: "text-red-500",
            sub: "not settled",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {cards.map((card, index) => {
                const Icon = card.icon;
                return (
                    <div key={index} className="bg-white rounded-xl shadow-lg p-5">
                        <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium text-gray-600">{card.title}</p>
                            <Icon className={`w-5 h-5 ${card.color}`} />
                        </div>
                        <p className="text-2xl font-bold text-gray-900 truncate">{card.value}</p>
                        {card.sub && (
                            <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default PaymentStatsCards;