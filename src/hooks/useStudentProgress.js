import {useState, useEffect, useCallback} from "react";
import {studentProgressService} from "../api/studentProgressService.js";

export const useStudentProgress = (courseId = null) => {
    const [courseProgress, setCourseProgress] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [completedLessonIds, setCompletedLessonIds] = useState([]);
    const [allCoursesProgress, setAllCoursesProgress] = useState([]);

    const fetchProgress = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            if (courseId) {
                // Fetch both lesson-level ids and course-level summary in parallel
                const [idsRes, progressRes] = await Promise.all([
                    studentProgressService.getCompletedLessonIds(courseId),
                    studentProgressService.getCourseProgress(courseId),
                ]);
                setCompletedLessonIds(idsRes.data);
                setCourseProgress(progressRes.data);
            } else {
                const res = await studentProgressService.getAllCoursesProgress();
                setAllCoursesProgress(res.data);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load progress.");
        } finally {
            setLoading(false);
        }
    }, [courseId]);

    useEffect(() => {
        fetchProgress();
    }, [fetchProgress]);

    const markComplete = async (lessonId) => {
        await studentProgressService.markLessonComplete(lessonId);
        await fetchProgress();
    };

    const unmarkComplete = async (lessonId) => {
        await studentProgressService.unmarkLessonComplete(lessonId);
        await fetchProgress();
    };

    const getResumeLessonId = async (id) => {
        const res = await studentProgressService.getResumeLessonId(id);
        return res.data;
    };

    return {
        completedLessonIds,
        courseProgress,
        allCoursesProgress,
        loading,
        error,
        markComplete,
        unmarkComplete,
        getResumeLessonId,
        refetch: fetchProgress };
};