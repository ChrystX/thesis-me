import {lessonService} from "../../api/lessonService.js";
import {useEffect, useState} from "react";

export function useLessons(sectionId) {
    const [lessons, setLessons] = useState([]);

    const fetchLessons = async () => {
        const res = await lessonService.getLessons(sectionId);
        setLessons(res.data);
    };

    const createLesson = async (dto) => {
        await lessonService.createLesson(sectionId, dto);
        fetchLessons();
    };

    const updateLesson = async (lessonId, dto) => {
        await lessonService.updateLesson(sectionId, lessonId, dto);
        fetchLessons();
    };

    const deleteLesson = async (lessonId) => {
        await lessonService.deleteLesson(sectionId, lessonId);
        fetchLessons();
    };

    useEffect(() => {
        if (sectionId) fetchLessons();
    }, [sectionId]);

    return {
        lessons,
        createLesson,
        updateLesson,
        deleteLesson,
        refetch: fetchLessons
    };
}