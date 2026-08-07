import { useState, useCallback, useEffect } from "react";
import {blogDetailService} from "../../../api/blog/blogDetailService.js";

export function useBlogDetailAdmin(blogId) {
    const [blogDetail, setBlogDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDetail = useCallback(async () => {
        if (!blogId) return;
        try {
            setLoading(true);
            setError(null);
            const res = await blogDetailService.getById(blogId);
            setBlogDetail(res.data);
        } catch (e) {
            // 404 is fine — detail may not exist yet
            if (e?.response?.status !== 404) {
                setError(e.message ?? "Failed to load blog detail");
            }
            setBlogDetail(null);
        } finally {
            setLoading(false);
        }
    }, [blogId]);

    useEffect(() => {
        fetchDetail();
    }, [fetchDetail]);

    const saveBlogDetail = useCallback(async (dto) => {
        if (blogDetail) {
            // already exists → PUT
            await blogDetailService.update(dto.blogId, dto);
            setBlogDetail(dto);
        } else {
            // doesn't exist yet → POST
            const res = await blogDetailService.create(dto);
            setBlogDetail(res.data);
        }
    }, [blogDetail]);

    const removeBlogDetail = useCallback(async (blogId) => {
        await blogDetailService.remove(blogId);
        setBlogDetail(null);
    }, []);

    return {
        blogDetail,
        loading,
        error,
        refetch: fetchDetail,
        saveBlogDetail,
        removeBlogDetail,
    };
}