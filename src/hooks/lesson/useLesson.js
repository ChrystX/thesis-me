import { useState, useEffect } from "react";
import { lessonService } from "../../api/lessonService.js";

export function useLesson(lessonId) {
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!lessonId) return;

        const fetchLesson = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await lessonService.getLesson(lessonId);
                setLesson(res.data);
            } catch (err) {
                if (err.response?.status === 403) {
                    setError("locked");
                } else {
                    setError(err.response?.data?.message || "Failed to load lesson.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchLesson();
    }, [lessonId]);

    return { lesson, loading, error };
}