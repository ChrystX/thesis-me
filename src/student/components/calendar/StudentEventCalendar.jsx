import { useState } from "react";
import {EventCalendar} from "../../../shared/components/events/calendar/EventCalendar.jsx";
import {EventPopover} from "../../../shared/components/events/popover/EventPopover.jsx";
import {useEvents} from "../../../hooks/events/useEvents.js";

export function StudentEventCalendar() {
    const { events } = useEvents();
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white rounded-2xl border border-rose-100 shadow-sm overflow-hidden">
            {/* toggle header */}
            <button
                onClick={() => setIsOpen(p => !p)}
                className="w-full flex items-center justify-between px-5 py-4"
            >
                <div>
                    <p className="text-xs uppercase tracking-widest text-pink-400"
                       style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Upcoming Events
                    </p>
                    <p className="text-sm text-gray-400 mt-0.5"
                       style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {events.length} event{events.length !== 1 ? "s" : ""} this month
                    </p>
                </div>
                <span className="text-gray-400 text-sm">
                    {isOpen ? "▲ Hide" : "▼ Show"}
                </span>
            </button>

            {isOpen && (
                <div className="px-5 pb-5">
                    <EventCalendar
                        events={events}
                        onEventClick={setSelectedEvent}
                    />
                </div>
            )}

            {selectedEvent && (
                <EventPopover
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                />
            )}
        </div>
    );
}