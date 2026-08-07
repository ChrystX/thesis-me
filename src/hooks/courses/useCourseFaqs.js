import { useEffect, useState, useCallback } from "react";
import {courseFaqService} from "../../api/course/courseFaqService.js";

export function useCourseFaqs(courseId) {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchFaqs = useCallback(async () => {
        if (!courseId) return;
        try {
            setLoading(true);
            setError(null);
            const res = await courseFaqService.getAll();
            setFaqs(res.data.filter(f => f.courseId === Number(courseId)));
        } catch (e) {
            setError(e.message ?? "Failed to load FAQs");
        } finally {
            setLoading(false);
        }
    }, [courseId]);

    useEffect(() => {
        fetchFaqs();
    }, [fetchFaqs]);

    const createFaq = useCallback(async (dto) => {
        const res = await courseFaqService.create(dto);
        setFaqs(prev => [...prev, res.data]);
        return res.data;
    }, []);

    const updateFaq = useCallback(async (id, dto) => {
        await courseFaqService.update(id, dto);
        setFaqs(prev => prev.map(f => f.id === id ? { ...f, ...dto } : f));
    }, []);

    const deleteFaq = useCallback(async (id) => {
        await courseFaqService.remove(id);
        setFaqs(prev => prev.filter(f => f.id !== id));
    }, []);

    return {
        faqs,
        loading,
        error,
        refetch: fetchFaqs,
        createFaq,
        updateFaq,
        deleteFaq,
    };
}