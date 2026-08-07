import { useCallback, useEffect, useState } from "react";
import {eventQueryService} from "../../api/event/eventQueryService.js";


export function useEventDetail(id) {
    const [event, setEvent] = useState(null);

    const fetchEventDetail = useCallback(async () => {
        if (!id) return;
        try {
            const res = await eventQueryService.getEventDetail(id);
            setEvent(res.data);
        } catch (err) {
            console.error("Failed to fetch event detail", err);
        }
    }, [id]);

    useEffect(() => {
        fetchEventDetail();
    }, [fetchEventDetail]);

    return { event, refetch: fetchEventDetail };
}