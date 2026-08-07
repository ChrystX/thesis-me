import {learningSectionService} from "../api/learningSectionService.js";
import {useCallback, useEffect, useState} from "react";

export function useLearningSections(courseId) {
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSections = useCallback(async () => {
        if (!courseId) return;

        setLoading(true);
        try {
            const res = await learningSectionService.getSectionsAdmin(courseId);
            setSections(res.data);
        } finally {
            setLoading(false); // ✅ always runs, even on error
        }
    }, [courseId]);

    useEffect(() => {
        fetchSections();
    }, [fetchSections]);

    const createSection = async (dto) => {
        await learningSectionService.createSection(courseId, dto);
        fetchSections();
    };

    const updateSection = async (sectionId, dto) => {
        await learningSectionService.updateSection(courseId, sectionId, dto);
        fetchSections();
    };

    const deleteSection = async (sectionId) => {
        await learningSectionService.deleteSection(courseId, sectionId);
        fetchSections();
    };

    return {
        sections,
        loading,
        createSection,
        updateSection,
        deleteSection,
        refetch: fetchSections
    };
}