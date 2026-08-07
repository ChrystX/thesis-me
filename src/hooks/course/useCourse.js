import { useEffect, useState } from "react";
import { courseService } from "../../api/courseService.js";

export function useCourse(courseId) {
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!courseId) return;

        const fetchCourse = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await courseService.getById(courseId);
                setCourse(res.data);
            } catch (e) {
                setError(e.message ?? "Failed to load course");
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseId]);

    return { course, loading, error };
}
