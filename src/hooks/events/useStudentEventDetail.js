import { useCallback, useEffect, useState } from "react"
import {eventQueryService} from "../../api/event/eventQueryService.js";
import {eventRegistrationService} from "../../api/event/eventRegistrationService.js";
import {eventAttendanceService} from "../../api/event/eventAttendanceService.js";

export function useStudentEventDetail(id) {
    const [event, setEvent] = useState(null);

    const fetchStudentEventDetail = useCallback(async () => {
        if (!id) return;
        try {
            const res = await eventQueryService.getStudentEventDetail(id);
            setEvent(res.data);
        } catch (err) {
            console.error("Failed to fetch student event detail", err);
        }
    }, [id]);

    useEffect(() => {
        fetchStudentEventDetail();
    }, [fetchStudentEventDetail]);

    const register = async () => {
        try {
            await eventRegistrationService.register(id);
            await fetchStudentEventDetail();
        } catch (err) {
            console.error("Failed to register", err);
        }
    };

    const cancelRegistration = async () => {
        try {
            await eventRegistrationService.cancelRegistration(id);
            await fetchStudentEventDetail();
        } catch (err) {
            console.error("Failed to cancel registration", err);
        }
    };

    const checkIn = async () => {
        try {
            await eventAttendanceService.checkIn(id);
            await fetchStudentEventDetail();
        } catch (err) {
            console.error("Failed to check in", err);
        }
    };

    return {
        event,
        register,
        cancelRegistration,
        checkIn,
        refetch: fetchStudentEventDetail
    };
}