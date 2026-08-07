export function EventPopoverHeader({ event, onClose }) {
    return (
        <>
            <div className="h-2 rounded-t-xl" style={{ backgroundColor: event.color ?? "#4A90D9" }} />
            <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                    <h2 className="text-base font-medium text-gray-900">{event.title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-lg leading-none"
                    >
                        ✕
                    </button>
                </div>

                <div className="text-sm text-gray-500 space-y-1">
                    <p>{formatDateRange(event.startTime, event.endTime)}</p>
                    {event.location && <p>📍 {event.location}</p>}
                    {event.meetingUrl && (
                        <a
                            href={event.meetingUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 hover:underline block"
                        >
                            Join meeting
                        </a>
                    )}
                </div>

                {event.description && (
                    <p className="text-sm text-gray-600">{event.description}</p>
                )}
            </div>
        </>
    );
}

function formatDateRange(start, end) {
    const s = new Date(start.endsWith("Z") ? start : start + "Z");
    const e = new Date(end.endsWith("Z") ? end : end + "Z");
    const dateOpts = { weekday: "short", month: "short", day: "numeric" };
    const timeOpts = { hour: "numeric", minute: "2-digit" };
    return `${s.toLocaleDateString(undefined, dateOpts)} · ${s.toLocaleTimeString(undefined, timeOpts)} – ${e.toLocaleTimeString(undefined, timeOpts)}`;
}