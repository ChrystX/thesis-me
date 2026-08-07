import { useEffect, useState, useCallback } from "react";
import {courseDetailService} from "../../api/course/courseDetailService.js";

export function useCourseDetail(courseId) {
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDetail = useCallback(async () => {
        if (!courseId) return;
        try {
            setLoading(true);
            setError(null);
            const res = await courseDetailService.getByCourseId(courseId); // ← fix this
            setDetail(res.data);
        } catch (e) {
            setError(e.message ?? "Failed to load course detail");
        } finally {
            setLoading(false);
        }
    }, [courseId]);

    useEffect(() => {
        fetchDetail();
    }, [fetchDetail]);

    const createDetail = useCallback(async (dto) => {
        const res = await courseDetailService.create(dto);
        setDetail(res.data);
        return res.data;
    }, []);

    const updateDetail = useCallback(async (id, dto) => {
        await courseDetailService.update(id, dto);
        setDetail(prev => ({ ...prev, ...dto }));
    }, []);

    const deleteDetail = useCallback(async (id) => {
        await courseDetailService.remove(id);
        setDetail(null);
    }, []);

    return {
        detail,
        loading,
        error,
        refetch: fetchDetail,
        createDetail,
        updateDetail,
        deleteDetail,
    };
}