import { Eye } from "lucide-react";

const STATUS_STYLES = {
    Success: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Failed:  "bg-red-100 text-red-700",
    Expired: "bg-gray-100 text-gray-500",
};

const STATUS_DOTS = {
    Success: "bg-green-500",
    Pending: "bg-yellow-500",
    Failed:  "bg-red-500",
    Expired: "bg-gray-400",
};

const fmtIDR = (n) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(n);

const fmtDate = (s) =>
    s ? new Date(s).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }) : "—";

const PaymentTableRow = ({ payment, index }) => {
    const statusStyle = STATUS_STYLES[payment.status] ?? STATUS_STYLES.Expired;
    const dotStyle    = STATUS_DOTS[payment.status]   ?? STATUS_DOTS.Expired;

    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4">
                <span className="text-sm font-mono text-gray-400">{index}</span>
            </td>

            <td className="px-6 py-4">
                <span className="text-xs font-mono text-gray-500">
                    {payment.orderId?.replace("ORDER-", "").slice(0, 8) ?? "—"}
                </span>
            </td>

            <td className="px-6 py-4">
                <span className="text-sm font-medium text-gray-900">
                    {payment.studentName ?? "—"}
                </span>
            </td>

            <td className="px-6 py-4 max-w-[180px]">
                <span className="text-sm text-gray-500 truncate block">
                    {payment.courseName ?? "—"}
                </span>
            </td>

            <td className="px-6 py-4">
                <span className="text-sm font-semibold text-gray-900">
                    {fmtIDR(payment.amount)}
                </span>
            </td>

            <td className="px-6 py-4">
                <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${statusStyle}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${dotStyle}`} />
                    {payment.status}
                </span>
            </td>

            <td className="px-6 py-4">
                <span className="text-sm text-gray-500">{fmtDate(payment.createdAt)}</span>
            </td>

        </tr>
    );
};

export default PaymentTableRow;