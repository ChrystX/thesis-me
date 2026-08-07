import { useEffect, useState, useCallback } from "react";
import { blogService } from "../../api/blog/blogService.js";

export function useBlogData({ publishedOnly = true } = {}) {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBlogs = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = publishedOnly
                ? await blogService.getPublished()
                : await blogService.getAll();
            setBlogs(res.data);
        } catch (e) {
            setError(e.message ?? "Failed to load blogs");
        } finally {
            setLoading(false);
        }
    }, [publishedOnly]);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    const incrementView = useCallback(async (id) => {
        await blogService.incrementView(id);
        setBlogs(prev =>
            prev.map(b => b.id === id ? { ...b, viewCount: (b.viewCount ?? 0) + 1 } : b)
        );
    }, []);

    return {
        blogs,
        loading,
        error,
        hasData: blogs.length > 0,
        refetch: fetchBlogs,
        incrementView,
    };
}