import { useCallback, useEffect, useState } from "react";
import {eventRegistrationService} from "../../api/event/eventRegistrationService.js";

export function useEventRegistration(eventId) {
    const [registrationStatus, setRegistrationStatus] = useState(null);
    const [registrations, setRegistrations] = useState([]);

    const fetchRegistrationStatus = useCallback(async () => {
        if (!eventId) return;
        try {
            const res = await eventRegistrationService.checkRegistration(eventId);
            setRegistrationStatus(res.data);
        } catch (err) {
            console.error("Failed to fetch registration status", err);
        }
    }, [eventId]);

    const fetchRegistrations = useCallback(async () => {
        if (!eventId) return;
        try {
            const res = await eventRegistrationService.getRegistrations(eventId);
            setRegistrations(res.data);
        } catch (err) {
            console.error("Failed to fetch registrations", err);
        }
    }, [eventId]);

    useEffect(() => {
        fetchRegistrationStatus();
    }, [fetchRegistrationStatus]);

    const register = async () => {
        await eventRegistrationService.register(eventId);
        fetchRegistrationStatus();
    };

    const cancelRegistration = async () => {
        await eventRegistrationService.cancelRegistration(eventId);
        fetchRegistrationStatus();
    };

    return {
        registrationStatus,
        registrations,
        register,
        cancelRegistration,
        refetch: fetchRegistrationStatus,
    };
}