import { useState } from "react";
import { Calendar, RefreshCw } from "lucide-react";
import { DashboardHeader } from "../../components/DashboardHeader.jsx";
import EventStatsCards from "../../components/events/EventStatsCards.jsx";
import AttendanceModal from "../../components/events/AttendanceModal.jsx";
import {useEvents} from "../../../hooks/events/useEvents.js";
import EventTable from "../../components/events/table/EventTable.jsx";

const EventsPage = () => {
    const { events, loading, refetch } = useEvents();

    const [attendanceModal, setAttendanceModal] = useState({
        isOpen: false,
        event: null,
    });

    const openAttendance = (event) => {
        setAttendanceModal({ isOpen: true, event });
    };

    const closeAttendance = () => {
        setAttendanceModal({ isOpen: false, event: null });
        refetch(); // refresh event list so registered counts stay current
    };

    return (
        <div className="max-w-7xl mx-auto px-4 space-y-6">
            <DashboardHeader
                title="Events"
                subtitle="Manage your events and attendance"
                icon={Calendar}
                onRefresh={refetch}
                loading={loading}
            />

            <EventStatsCards events={events} />

            <EventTable
                events={events}
                loading={loading}
                onViewAttendance={openAttendance}
            />

            <AttendanceModal
                isOpen={attendanceModal.isOpen}
                onClose={closeAttendance}
                event={attendanceModal.event}
            />
        </div>
    );
};

export default EventsPage;