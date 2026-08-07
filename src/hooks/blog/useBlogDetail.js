import { useEffect, useState, useCallback } from "react";
import {blogDetailService} from "../../api/blog/blogDetailService.js";
import {blogService} from "../../api/blog/blogService.js";

export function useBlogDetail(blogId) {
    const [blog, setBlog] = useState(null);
    const [blogDetail, setBlogDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDetail = useCallback(async () => {
        if (!blogId) return;
        try {
            setLoading(true);
            setError(null);

            const [detailRes, blogRes] = await Promise.all([
                blogDetailService.getById(blogId),
                blogService.getById(blogId),
            ]);

            setBlogDetail(detailRes.data);
            setBlog({
                blogId: detailRes.data.blogId,
                title: detailRes.data.seoTitle || blogRes.data.title || 'Blog Post',
                summary: detailRes.data.seoDescription || blogRes.data.summary || '',
                thumbnailUrl: blogRes.data.thumbnailUrl || null,
                publishedAt: blogRes.data.publishedAt || blogRes.data.createdAt || new Date().toISOString(),
                viewCount: blogRes.data.viewCount || 0,
            });

            // fire-and-forget view increment
            blogService.incrementView(blogId).catch(e =>
                console.warn('Failed to increment view count:', e)
            );
            setBlog(prev => prev ? { ...prev, viewCount: prev.viewCount + 1 } : null);

        } catch (e) {
            setError(e.message ?? "Failed to load blog post");
        } finally {
            setLoading(false);
        }
    }, [blogId]);

    useEffect(() => {
        fetchDetail();
    }, [fetchDetail]);

    return { blog, blogDetail, loading, error };
}