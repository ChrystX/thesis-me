import { useState, useCallback } from "react";
import {courseInstructorService} from "../../api/coursedetails/courseInstructorService.js";

export function useCourseInstructors(courseId) {
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchInstructors = useCallback(async () => {
        if (!courseId) return;
        try {
            setLoading(true);
            setError(null);
            const res = await courseInstructorService.getByCourseId(courseId); // ✅ fix
            setInstructors(res.data);
        } catch (e) {
            if (e?.response?.status === 404) {
                setInstructors([]); // no instructors = empty, not an error
            } else {
                setError(e.message ?? "Failed to load instructors");
            }
        } finally {
            setLoading(false);
        }
    }, [courseId]);

    const assign = useCallback(async (dto) => {
        const res = await courseInstructorService.create(dto); // ✅ fix
        await fetchInstructors(); // refetch full shaped data instead of appending raw entity
        return res.data;
    }, [fetchInstructors]);

    const unassign = useCallback(async (instructorId) => {
        await courseInstructorService.remove(courseId, instructorId);
        setInstructors(prev => prev.filter(i => i.instructorId !== instructorId));
    }, [courseId]);

    return {
        instructors,
        loading,
        error,
        refetch: fetchInstructors,
        assign,
        unassign,
    };
}