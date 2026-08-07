import { useState, useEffect } from "react";
import { learningSectionService } from "../api/learningSectionService.js";

export function useSyllabus(courseId) {
    const [sections, setSections] = useState([]);
    const [flatLessons, setFlatLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!courseId) return;

        const fetchSyllabus = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await learningSectionService.getSyllabus(courseId);
                setSections(res.data);
                // Flatten all lessons across sections in order — used for prev/next
                const flat = res.data.flatMap(section =>
                    section.lessons.map(lesson => ({
                        ...lesson,
                        sectionTitle: section.title
                    }))
                );
                setFlatLessons(flat);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load syllabus.");
            } finally {
                setLoading(false);
            }
        };

        fetchSyllabus();
    }, [courseId]);

    const getLessonIndex = (lessonId) =>
        flatLessons.findIndex(l => l.id === lessonId);

    const getPrevLesson = (lessonId) => {
        const idx = getLessonIndex(lessonId);
        return idx > 0 ? flatLessons[idx - 1] : null;
    };

    const getNextLesson = (lessonId) => {
        const idx = getLessonIndex(lessonId);
        return idx < flatLessons.length - 1 ? flatLessons[idx + 1] : null;
    };

    return { sections, flatLessons, loading, error, getPrevLesson, getNextLesson };
}