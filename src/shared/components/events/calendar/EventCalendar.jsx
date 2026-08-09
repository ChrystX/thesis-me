import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {useAuth} from "../../../../hooks/useAuth.jsx";

export function EventCalendar({ events, onEventClick, onDateSelect, onRangeChange }) {
    const { user } = useAuth();
    const isInstructor = ["instructor", "admin"].includes(user?.roleName);

    const fullCalendarEvents = events.map(e => ({
        id: String(e.id),
        title: e.title,
        start: e.startTime.endsWith("Z") ? e.startTime : e.startTime + "Z",
        end: e.endTime.endsWith("Z") ? e.endTime : e.endTime + "Z",
        backgroundColor: e.color ?? "#4A90D9",
        borderColor: e.color ?? "#4A90D9",
        extendedProps: e,
    }));

    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={fullCalendarEvents}
            eventClick={info => onEventClick?.(info.event.extendedProps)}
            selectable={isInstructor}
            select={isInstructor ? onDateSelect : undefined}
            height="auto"
            eventDisplay="block"
            dayMaxEvents={3}
            datesSet={(arg) => {
                onRangeChange?.({ start: arg.startStr, end: arg.endStr });
            }}
        />
    );
}