import {useEvents} from "../../../../hooks/events/useEvents.js";
import {useInstructorEventDetail} from "../../../../hooks/events/useInstructorEventDetail.js";

export function InstructorPopoverActions({ event, onEdit, onClose }) {
    const { deleteEvent } = useEvents();
    const { event: detail } = useInstructorEventDetail(event.id);

    const handleDelete = async () => {
        if (!confirm("Delete this event?")) return;
        await deleteEvent(event.id);
        onClose();
    };

    return (
        <div className="px-4 pb-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
                <Stat label="Registered" value={event.registeredCount ?? "—"} />
                <Stat label="Attended" value={event.attendedCount ?? "—"} />
            </div>

            {event.capacity && (
                <p className="text-xs text-gray-400 text-right">
                    {event.registeredCount ?? 0} / {event.capacity} spots
                </p>
            )}

            <div className="flex gap-2">
                <button
                    onClick={() => onEdit(detail ?? event)}
                    className="flex-1 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-all"
                >
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    className="flex-1 py-2 text-sm border border-red-100 rounded-lg text-red-500 hover:bg-red-50 transition-all"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

function Stat({ label, value }) {
    return (
        <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-lg font-medium text-gray-900">{value}</p>
            <p className="text-xs text-gray-400">{label}</p>
        </div>
    );
}