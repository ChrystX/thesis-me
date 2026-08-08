import { useCallback, useEffect, useState } from "react"
import {eventQueryService} from "../../api/event/eventQueryService.js";
import {eventRegistrationService} from "../../api/event/eventRegistrationService.js";
import {eventAttendanceService} from "../../api/event/eventAttendanceService.js";

export function useStudentEventDetail(id) {
    const [event, setEvent] = useState(null);
    const [actionError, setActionError] = useState(null);

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
        setActionError(null);
        try {
            await eventRegistrationService.register(id);
            await fetchStudentEventDetail();
        } catch (err) {
            console.error("Failed to register", err);
            setActionError(err.response?.data?.message ?? "Failed to register. Please try again.");
        }
    };

    const cancelRegistration = async () => {
        setActionError(null);
        try {
            await eventRegistrationService.cancelRegistration(id);
            await fetchStudentEventDetail();
        } catch (err) {
            console.error("Failed to cancel registration", err);
            setActionError(err.response?.data?.message ?? "Failed to cancel registration. Please try again.");
        }

    };

    const checkIn = async () => {
        setActionError(null);
        try {
            await eventAttendanceService.checkIn(id);
            await fetchStudentEventDetail();
        } catch (err) {
            console.error("Failed to check in", err);
            setActionError(err.response?.data?.message ?? "Failed to check in. Please try again.");
        }
    };

    return {
        event,
        register,
        cancelRegistration,
        checkIn,
        actionError,
        refetch: fetchStudentEventDetail
    };
}