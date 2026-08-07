import { useEffect, useState, useCallback } from "react";
import {categoryService} from "../../api/course/categoryService.js";

export function useCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCategories = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            console.log("fetching categories...");
            const res = await categoryService.getAll();
            console.log("categories res:", res);
            setCategories(res.data);
        } catch (e) {
            console.error("categories error:", e);
            setError(e.message ?? "Failed to load categories");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const createCategory = useCallback(async (dto) => {
        const res = await categoryService.create(dto);
        setCategories(prev => [...prev, res.data]);
        return res.data;
    }, []);

    const updateCategory = useCallback(async (id, dto) => {
        await categoryService.update(id, dto);
        setCategories(prev => prev.map(c => c.id === id ? { ...c, ...dto } : c));
    }, []);

    const deleteCategory = useCallback(async (id) => {
        await categoryService.remove(id);
        setCategories(prev => prev.filter(c => c.id !== id));
    }, []);

    return {
        categories,
        loading,
        error,
        refetch: fetchCategories,
        createCategory,
        updateCategory,
        deleteCategory,
    };
}