import { useState, useCallback, useEffect } from "react";
import {blogService} from "../../../api/blog/blogService.js";

export function useBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBlogs = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await blogService.getAll(); // admin sees all statuses
            setBlogs(res.data);
        } catch (e) {
            setError(e.message ?? "Failed to load blogs");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    const createBlog = useCallback(async (dto) => {
        const res = await blogService.create(dto);
        setBlogs(prev => [res.data, ...prev]);
        return res.data;
    }, []);

    const updateBlog = useCallback(async (id, dto) => {
        await blogService.update(id, dto);
        setBlogs(prev =>
            prev.map(b => b.id === id ? { ...b, ...dto } : b)
        );
    }, []);

    const deleteBlog = useCallback(async (id) => {
        await blogService.remove(id);
        setBlogs(prev => prev.filter(b => b.id !== id));
    }, []);

    const toggleStatus = useCallback(async (blog) => {
        const next = blog.status === "published" ? "draft" : "published";
        const dto = {
            ...blog,
            status: next,
            publishedAt: next === "published" ? new Date().toISOString() : blog.publishedAt,
        };
        await blogService.update(blog.id, dto);
        setBlogs(prev =>
            prev.map(b => b.id === blog.id ? { ...b, status: next } : b)
        );
    }, []);

    return {
        blogs,
        loading,
        error,
        refetch: fetchBlogs,
        createBlog,
        updateBlog,
        deleteBlog,
        toggleStatus,
    };
}