import { useCallback, useEffect, useState } from "react";
import {eventAttendanceService} from "../../api/event/eventAttendanceService.js";

export function useEventAttendance(eventId) {
    const [report, setReport] = useState(null);
    const [stats, setStats] = useState(null);
    const [myAttendance, setMyAttendance] = useState(null);

    const fetchReport = useCallback(async () => {
        if (!eventId) return;
        try {
            const res = await eventAttendanceService.getAttendanceReport(eventId);
            setReport(res.data);
        } catch (err) {
            console.error("Failed to fetch attendance report", err);
        }
    }, [eventId]);

    const fetchStats = useCallback(async () => {
        if (!eventId) return;
        try {
            const res = await eventAttendanceService.getAttendanceStats(eventId);
            setStats(res.data);
        } catch (err) {
            console.error("Failed to fetch attendance stats", err);
        }
    }, [eventId]);

    const fetchMyAttendance = useCallback(async () => {
        if (!eventId) return;
        try {
            const res = await eventAttendanceService.getMyAttendance(eventId);
            setMyAttendance(res.data);
        } catch (err) {
            console.error("Failed to fetch my attendance", err);
        }
    }, [eventId]);

    useEffect(() => {
        fetchReport();
        fetchStats();
        fetchMyAttendance();
    }, [fetchReport, fetchStats, fetchMyAttendance]);

    const checkIn = async () => {
        await eventAttendanceService.checkIn(eventId);
        fetchMyAttendance();
        fetchStats();
    };

    const markAttendance = async (dto) => {
        await eventAttendanceService.markAttendance(eventId, dto);
        fetchReport();
        fetchStats();
    };

    const bulkMarkAttendance = async (dto) => {
        await eventAttendanceService.bulkMarkAttendance(eventId, dto);
        fetchReport();
        fetchStats();
    };

    return {
        report,
        stats,
        myAttendance,
        checkIn,
        markAttendance,
        bulkMarkAttendance,
        refetch: () => {
            fetchReport();
            fetchStats();
            fetchMyAttendance();
        },
    };
}