import { useEffect, useState, useCallback } from "react";
import {courseSectionService} from "../../api/course/courseSectionService.js";

export function useCourseSections(courseId) {
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSections = useCallback(async () => {
        if (!courseId) return;
        try {
            setLoading(true);
            setError(null);
            const res = await courseSectionService.getAll();
            setSections(res.data.filter(s => s.courseId === Number(courseId)));
        } catch (e) {
            setError(e.message ?? "Failed to load sections");
        } finally {
            setLoading(false);
        }
    }, [courseId]);

    useEffect(() => {
        fetchSections();
    }, [fetchSections]);

    const createSection = useCallback(async (dto) => {
        const res = await courseSectionService.create(dto);
        setSections(prev => [...prev, res.data]);
        return res.data;
    }, []);

    const updateSection = useCallback(async (id, dto) => {
        await courseSectionService.update(id, dto);
        setSections(prev => prev.map(s => s.id === id ? { ...s, ...dto } : s));
    }, []);

    const deleteSection = useCallback(async (id) => {
        await courseSectionService.remove(id);
        setSections(prev => prev.filter(s => s.id !== id));
    }, []);

    return {
        sections,
        loading,
        error,
        refetch: fetchSections,
        createSection,
        updateSection,
        deleteSection,
    };
}