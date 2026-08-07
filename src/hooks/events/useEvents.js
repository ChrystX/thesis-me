import { useCallback, useEffect, useState } from "react";
import {eventService} from "../../api/event/eventService.js";
import {eventQueryService} from "../../api/event/eventQueryService.js";

export function useEvents(filter = {}) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const filterKey = JSON.stringify(filter);

    const fetchEvents = useCallback(async () => {
        setLoading(true);
        try {
            const res = await eventQueryService.getEvents(filter);
            setEvents(res.data);
        } catch (err) {
            console.error("Failed to fetch events", err);
        } finally {
            setLoading(false);
        }
    }, [filterKey]);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    const createEvent = async (dto) => {
        await eventService.createEvent(dto);
        fetchEvents();
    };

    const updateEvent = async (id, dto) => {
        await eventService.updateEvent(id, dto);
        fetchEvents();
    };

    const deleteEvent = async (id) => {
        await eventService.deleteEvent(id);
        fetchEvents();
    };

    const toggleEventStatus = async (id, isActive) => {
        await eventService.toggleEventStatus(id, isActive);
        fetchEvents();
    };

    return {
        events,
        loading,
        createEvent,
        updateEvent,
        deleteEvent,
        toggleEventStatus,
        refetch: fetchEvents
    };
}