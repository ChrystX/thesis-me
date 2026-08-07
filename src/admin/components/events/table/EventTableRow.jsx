import { Users, ClipboardList, Calendar } from "lucide-react";

const statusConfig = {
    upcoming: { label: "Upcoming", className: "bg-amber-100 text-amber-700" },
    past: { label: "Past", className: "bg-gray-100 text-gray-600" },
    active: { label: "Active", className: "bg-green-100 text-green-700" },
};

const typeConfig = {
    webinar: { label: "Webinar", className: "bg-blue-100 text-blue-700" },
    seminar: { label: "Seminar", className: "bg-purple-100 text-purple-700" },
    workshop: { label: "Workshop", className: "bg-orange-100 text-orange-700" },
    class: { label: "Class", className: "bg-teal-100 text-teal-700" },
};

const formatDate = (dt) =>
    new Intl.DateTimeFormat("id-ID", {
        day: "2-digit", month: "short", year: "numeric",
        hour: "2-digit", minute: "2-digit",
    }).format(new Date(dt));

const EventTableRow = ({ event, onViewAttendance }) => {
    const statusCfg = statusConfig[event.status] ?? { label: event.status, className: "bg-gray-100 text-gray-600" };
    const typeCfg = typeConfig[event.eventType?.toLowerCase()] ?? { label: event.eventType, className: "bg-gray-100 text-gray-600" };

    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4">
                <span className="text-sm font-mono text-gray-400">#{event.id}</span>
            </td>

            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    {event.color && (
                        <div
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: event.color }}
                        />
                    )}
                    <div>
                        <p className="text-sm font-semibold text-gray-900">{event.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(event.startTime)}
                        </p>
                    </div>
                </div>
            </td>

            <td className="px-6 py-4">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${typeCfg.className}`}>
                    {typeCfg.label}
                </span>
            </td>

            <td className="px-6 py-4">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusCfg.className}`}>
                    {statusCfg.label}
                </span>
            </td>

            <td className="px-6 py-4">
                <div className="flex items-center gap-1 text-sm text-gray-700">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">{event.registeredCount ?? 0}</span>
                    {event.capacity > 0 && (
                        <span className="text-gray-400">/ {event.capacity}</span>
                    )}
                </div>
            </td>

            <td className="px-6 py-4">
                <button
                    onClick={() => onViewAttendance(event)}
                    className="flex items-center gap-1.5 bg-slate-700 hover:bg-slate-800 text-white text-sm px-3 py-1.5 rounded-lg transition-colors font-medium"
                >
                    <ClipboardList className="w-4 h-4" />
                    View Attendance
                </button>
            </td>
        </tr>
    );
};

export default EventTableRow;