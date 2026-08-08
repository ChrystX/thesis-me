import { useState } from "react";
import { useEvents } from "../../../hooks/events/useEvents.js";
import { EventCalendar } from "../../../shared/components/events/calendar/EventCalendar.jsx";
import { EventPopover } from "../../../shared/components/events/popover/EventPopover.jsx";
import { Modal } from "../../../shared/components/events/calendar/Modal.jsx";
import {EventForm} from "../../../shared/components/events/EventForm.jsx";
import {EventsProvider} from "../../../context/EventsContext.jsx";

export function InstructorEventCalendar() {
    return (
        <EventsProvider>
            <InstructorEventCalendarInner/>
        </EventsProvider>
    );

    function InstructorEventCalendarInner() {
        const {events} = useEvents();
        const [selectedEvent, setSelectedEvent] = useState(null);
        const [editingEvent, setEditingEvent] = useState(null);
        const [showCreateModal, setShowCreateModal] = useState(false);
        const [prefilledDates, setPrefilledDates] = useState(null);


        const handleDateSelect = (selectInfo) => {
            setPrefilledDates({startTime: selectInfo.startStr, endTime: selectInfo.endStr});
            setShowCreateModal(true);
        };

        const handleEdit = (event) => {
            setSelectedEvent(null);
            setEditingEvent(event);
        };

        const closeCreate = () => {
            setShowCreateModal(false);
            setPrefilledDates(null);
        };

        return (
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">
                        {events.length} event{events.length !== 1 ? "s" : ""}
                    </p>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="px-3 py-1.5 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-all"
                    >
                        + New event
                    </button>
                </div>

                <EventCalendar
                    events={events}
                    onEventClick={setSelectedEvent}
                    onDateSelect={handleDateSelect}
                />

                {selectedEvent && (
                    <EventPopover
                        event={selectedEvent}
                        onClose={() => setSelectedEvent(null)}
                        onEdit={handleEdit}
                    />
                )}

                {showCreateModal && (
                    <Modal onClose={closeCreate}>
                        <EventForm
                            event={prefilledDates}
                            onSuccess={closeCreate}
                            onCancel={closeCreate}
                        />
                    </Modal>
                )}

                {editingEvent && (
                    <Modal onClose={() => setEditingEvent(null)}>
                        <EventForm
                            event={editingEvent}
                            onSuccess={() => setEditingEvent(null)}
                            onCancel={() => setEditingEvent(null)}
                        />
                    </Modal>
                )}
            </div>
        );
    }
}