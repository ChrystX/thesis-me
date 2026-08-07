import { useState, useEffect, useCallback } from "react";
import {courseService} from "../../api/courseService.js";
import {courseDetailService} from "../../api/course/courseDetailService.js";
import {courseFaqService} from "../../api/course/courseFaqService.js";
import {courseSectionService} from "../../api/course/courseSectionService.js";

export function useCoursePageData(courseId) {
    const [course, setCourse] = useState(null);
    const [detail, setDetail] = useState(null);
    const [faqs, setFaqs] = useState([]);
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAll = useCallback(async () => {
        if (!courseId) return;
        try {
            setLoading(true);
            setError(null);

            const [courseRes, detailRes, faqsRes, sectionsRes] = await Promise.all([
                courseService.getById(courseId),
                courseDetailService.getByCourseId(courseId),
                courseFaqService.getByCourseId(courseId),
                courseSectionService.getByCourseId(courseId),
            ]);

            setCourse(courseRes.data);
            setDetail(detailRes.data);
            setFaqs(faqsRes.data);
            setSections(sectionsRes.data);
        } catch (e) {
            setError(e.message ?? "Failed to load course data");
        } finally {
            setLoading(false);
        }
    }, [courseId]);

    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    return {
        course,
        detail,
        faqs,
        sections,
        loading,
        error,
        refetch: fetchAll,
    };
}