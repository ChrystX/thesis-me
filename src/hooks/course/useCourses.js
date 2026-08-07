import { useEffect, useState, useCallback } from "react";
import { courseService } from "../../api/courseService.js";

export function useCourses({ activeOnly = false, instructorId = null, skip = false } = {}) {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCourses = useCallback(async () => {
        if (skip) return; // ← don't fetch until ready

        try {
            setLoading(true);
            setError(null);
            let res;
            if (instructorId) {
                res = await courseService.getByInstructor(instructorId);
            } else if (activeOnly) {
                res = await courseService.getActive();
            } else {
                res = await courseService.getAll();
            }
            setCourses(res.data);
        } catch (e) {
            // 404 from instructor endpoint = no assigned courses, not a real error
            if (e?.response?.status === 404 && instructorId) {
                setCourses([]);
            } else {
                setError(e.message ?? "Failed to load courses");
            }
        } finally {
            setLoading(false);
        }
    }, [activeOnly, instructorId, skip]);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    const createCourse = useCallback(async (dto) => {
        const res = await courseService.create(dto);
        setCourses(prev => [...prev, res.data]);
        return res.data;
    }, []);

    const updateCourse = useCallback(async (id, dto) => {
        await courseService.update(id, dto);
        setCourses(prev => prev.map(c => c.id === id ? { ...c, ...dto } : c));
    }, []);

    const deleteCourse = useCallback(async (id) => {
        await courseService.remove(id);
        setCourses(prev => prev.filter(c => c.id !== id));
    }, []);

    const toggleActive = useCallback(async (course) => {
        const updated = { ...course, isActive: !course.isActive };
        await courseService.update(course.id, updated);
        setCourses(prev => prev.map(c => c.id === course.id ? updated : c));
    }, []);

    return {
        courses,
        loading,
        error,
        refetch: fetchCourses,
        createCourse,
        updateCourse,
        deleteCourse,
        toggleActive,
    };
}