import { useCallback, useEffect, useState } from "react";
import {eventQueryService} from "../../api/event/eventQueryService.js";
import {eventAttendanceService} from "../../api/event/eventAttendanceService.js";


export function useInstructorEventDetail(id) {
    const [event, setEvent] = useState(null);

    const fetchInstructorEventDetail = useCallback(async () => {
        if (!id) return;
        try {
            const res = await eventQueryService.getInstructorEventDetail(id);
            setEvent(res.data);
        } catch (err) {
            console.error("Failed to fetch instructor event detail", err);
        }
    }, [id]);

    useEffect(() => {
        fetchInstructorEventDetail();
    }, [fetchInstructorEventDetail]);

    const markAttendance = async (dto) => {
        await eventAttendanceService.markAttendance(id, dto);
        fetchInstructorEventDetail();
    };

    const bulkMarkAttendance = async (dto) => {
        await eventAttendanceService.bulkMarkAttendance(id, dto);
        fetchInstructorEventDetail();
    };

    return {
        event,
        markAttendance,
        bulkMarkAttendance,
        refetch: fetchInstructorEventDetail
    };
}