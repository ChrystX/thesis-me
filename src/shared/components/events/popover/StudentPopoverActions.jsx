import { useState } from "react";
import { useStudentEventDetail } from "../../../../hooks/events/useStudentEventDetail.js";

export function StudentPopoverActions({ event }) {
    const { event: detail, register, cancelRegistration, checkIn, actionError } = useStudentEventDetail(event.id);
    const [descExpanded, setDescExpanded] = useState(false);

    if (!detail) return <div className="px-4 pb-4 text-sm text-gray-400">Loading...</div>;

    const now = new Date();
    const toDate = (str) => new Date(/[Zz]|[+-]\d{2}:?\d{2}$/.test(str) ? str : str + "Z");
    const isLive = toDate(event.startTime) <= now && now <= toDate(event.endTime);
    const isPast = toDate(event.endTime) < now;

    const { isRegistered, canRegister, description, meetingUrl, isAttended, thumbnailUrl, location } = detail;

    const DESC_LIMIT = 120;
    const isLongDesc = description && description.length > DESC_LIMIT;

    return (
        <div className="flex flex-col max-h-80 overflow-hidden">
            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-4 pb-2 space-y-2 scrollbar-thin scrollbar-thumb-gray-200">
                {thumbnailUrl && (
                    <img
                        src={thumbnailUrl}
                        alt="Event poster"
                        className="w-full rounded-lg object-cover max-h-40"
                    />
                )}

                {description && (
                    <div className="text-sm text-gray-500">
                        <p>
                            {isLongDesc && !descExpanded
                                ? `${description.slice(0, DESC_LIMIT)}...`
                                : description}
                        </p>
                        {isLongDesc && (
                            <button
                                onClick={() => setDescExpanded(prev => !prev)}
                                className="mt-0.5 text-xs text-blue-500 hover:underline focus:outline-none"
                            >
                                {descExpanded ? "Show less" : "Read more"}
                            </button>
                        )}
                    </div>
                )}

                {meetingUrl && (
                    <a
                    href={meetingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-blue-600 hover:underline truncate"
                    >
                    Join meeting →
                    </a>
                    )}

                {location && (
                    <p className="text-sm text-gray-500">📍 {location}</p>
                )}

                <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        isRegistered ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
                    }`}>
                        {isRegistered ? "Registered" : "Not registered"}
                    </span>
                    {isLive && (
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-red-50 text-red-500">
                            Live now
                        </span>
                    )}
                </div>
            </div>

            {/* Pinned actions footer */}
            <div className="px-4 pt-2 pb-4 border-t border-gray-100 flex gap-2 shrink-0">
                {actionError && (
                   <p className="w-full text-xs text-red-500 mb-1">{actionError}</p>
                )}
                {isLive && detail.trackAttendance && !isAttended && (
                    <button
                        onClick={checkIn}
                        className="flex-1 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-all"
                    >
                        Check in
                    </button>
                )}

                {isAttended && (
                    <p className="text-sm text-green-600 font-medium">✓ Attended</p>
                )}

                {isPast ? (
                    <p className="text-sm text-gray-400 italic">This event has ended.</p>
                ) : !isLive && detail.requiresRegistration && (
                    isRegistered ? (
                        <button
                            onClick={cancelRegistration}
                            className="flex-1 py-2 text-sm border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-all"
                        >
                            Cancel registration
                        </button>
                    ) : canRegister ? (
                        <button
                            onClick={register}
                            className="flex-1 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-all"
                        >
                            Register
                        </button>
                    ) : (
                        <p className="text-sm text-gray-400">Registration closed</p>
                    )
                )}
            </div>
        </div>
    );
}