import { useState, useMemo } from "react";
import {
    LineChart, Line, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer,
} from "recharts";

const MODES = [
    { key: "daily",      label: "Daily" },
    { key: "cumulative", label: "Cumulative" },
    { key: "status",     label: "By Status" },
];

const STATUS_COLORS = {
    Success: "#22c55e",
    Pending: "#f59e0b",
    Failed:  "#ef4444",
    Expired: "#9ca3af",
};

const fmtIDR = (n) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        notation: "compact",
    }).format(n);

const fmtIDRFull = (n) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(n);

const PaymentChart = ({ payments = [] }) => {
    const [mode, setMode] = useState("daily");

    const dailyData = useMemo(() => {
        const map = {};
        payments
            .filter(p => p.status === "Success")
            .forEach(p => {
                const day = p.createdAt?.slice(0, 10) ?? "";
                map[day] = (map[day] || 0) + p.amount;
            });
        return Object.keys(map)
            .sort()
            .map(date => ({ date, revenue: map[date] }));
    }, [payments]);

    const cumulativeData = useMemo(() => {
        let cum = 0;
        return dailyData.map(d => ({ date: d.date, revenue: (cum += d.revenue) }));
    }, [dailyData]);

    const statusData = useMemo(() => {
        const map = { Success: 0, Pending: 0, Failed: 0, Expired: 0 };
        payments.forEach(p => { if (map[p.status] !== undefined) map[p.status]++; });
        return Object.entries(map).map(([status, count]) => ({ status, count }));
    }, [payments]);

    const activeData =
        mode === "daily"      ? dailyData :
            mode === "cumulative" ? cumulativeData :
                statusData;

    const CustomTooltip = ({ active, payload, label }) => {
        if (!active || !payload?.length) return null;
        const val = payload[0].value;
        return (
            <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow text-xs">
                <p className="text-gray-500 mb-1">{label}</p>
                <p className="font-semibold text-gray-900">
                    {mode === "status" ? `${val} transactions` : fmtIDRFull(val)}
                </p>
            </div>
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-800">Revenue Overview</h2>
                <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                    {MODES.map(m => (
                        <button
                            key={m.key}
                            onClick={() => setMode(m.key)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                                mode === m.key
                                    ? "bg-white text-gray-900 shadow-sm"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                        >
                            {m.label}
                        </button>
                    ))}
                </div>
            </div>

            <ResponsiveContainer width="100%" height={220}>
                {mode === "status" ? (
                    <BarChart data={activeData} barSize={40}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                        <XAxis dataKey="status" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} allowDecimals={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="count" radius={[4, 4, 0, 0]}
                             fill="#378ADD"
                             label={false}
                        >
                            {activeData.map((entry, i) => (
                                <rect key={i} fill={STATUS_COLORS[entry.status] || "#378ADD"} />
                            ))}
                        </Bar>
                    </BarChart>
                ) : (
                    <LineChart data={activeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 11, fill: "#9ca3af" }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={d => {
                                const dt = new Date(d + "T00:00:00");
                                return dt.toLocaleDateString("id-ID", { day: "2-digit", month: "short" });
                            }}
                        />
                        <YAxis
                            tick={{ fontSize: 11, fill: "#9ca3af" }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={fmtIDR}
                            width={70}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#378ADD"
                            strokeWidth={2}
                            dot={{ r: 3, fill: "#378ADD" }}
                            activeDot={{ r: 5 }}
                        />
                    </LineChart>
                )}
            </ResponsiveContainer>
        </div>
    );
};

export default PaymentChart;