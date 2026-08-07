import { useState, useCallback, useEffect } from "react";
import {blogTagService} from "../../../api/blog/blogTagService.js";

export function useBlogTags(blogId) {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTags = useCallback(async () => {
        if (!blogId) return;
        try {
            setLoading(true);
            setError(null);
            // getAll returns everything; filter client-side since no getByBlogId endpoint exists
            const res = await blogTagService.getAll();
            setTags(res.data.filter(t => t.blogId === blogId));
        } catch (e) {
            setError(e.message ?? "Failed to load tags");
        } finally {
            setLoading(false);
        }
    }, [blogId]);

    useEffect(() => {
        fetchTags();
    }, [fetchTags]);

    const addTag = useCallback(async (tag) => {
        const dto = { blogId, tag };
        await blogTagService.create(dto);
        setTags(prev => [...prev, dto]);
    }, [blogId]);

    const removeTag = useCallback(async (tag) => {
        await blogTagService.remove(blogId, tag);
        setTags(prev => prev.filter(t => t.tag !== tag));
    }, [blogId]);

    return {
        tags,
        loading,
        error,
        refetch: fetchTags,
        addTag,
        removeTag,
    };
}