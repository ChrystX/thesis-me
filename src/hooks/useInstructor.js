import { useEffect, useState, useCallback } from "react";
import { instructorService } from "../api/instructorService.js";

export function useInstructor(instructorId) {
    const [instructor, setInstructor] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchInstructor = useCallback(async () => {
        console.log("fetchInstructor called with:", instructorId);
        if (!instructorId) return;
        try {
            setLoading(true);
            setError(null);
            const res = await instructorService.getByUserId(instructorId);
            setInstructor(res.data);
            console.log(res.data)
        } catch (e) {
            setError(e.message ?? "Failed to load instructor");
        } finally {
            setLoading(false);
        }
    }, [instructorId]);

    const updateInstructor = useCallback(async (dto) => {
        console.log("instructor state at update time:", instructor);
        await instructorService.update(instructor?.id, dto);
        setInstructor(prev => ({ ...prev, ...dto }));
    }, [instructor]);

    useEffect(() => {
        fetchInstructor();
    }, [fetchInstructor]);

    return { instructor, loading, error, refetch: fetchInstructor, updateInstructor };
}