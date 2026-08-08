// context/EventsContext.jsx
import { createContext, useContext, useCallback, useEffect, useState } from "react";
import { eventService } from "../api/event/eventService.js";
import { eventQueryService } from "../api/event/eventQueryService.js";

const EventsContext = createContext(null);

export function EventsProvider({ filter = {}, children }) {
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

    useEffect(() => { fetchEvents(); }, [fetchEvents]);

    const createEvent = async (dto) => {
        await eventService.createEvent(dto);
        await fetchEvents();
    };

    const updateEvent = async (id, dto) => {
        await eventService.updateEvent(id, dto);
        await fetchEvents();
    };

    const deleteEvent = async (id) => {
        await eventService.deleteEvent(id);
        await fetchEvents();
    };

    const toggleEventStatus = async (id, isActive) => {
        await eventService.toggleEventStatus(id, isActive);
        await fetchEvents();
    };

    return (
        <EventsContext.Provider value={{
            events, loading, createEvent, updateEvent, deleteEvent, toggleEventStatus, refetch: fetchEvents
        }}>
            {children}
        </EventsContext.Provider>
    );
}

export function useEvents() {
    const ctx = useContext(EventsContext);
    if (!ctx) throw new Error("useEvents must be used within an EventsProvider");
    return ctx;
}