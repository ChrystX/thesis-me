import { useEffect, useState, useCallback } from "react";
import { instructorService } from "../api/instructorService.js";

export function useInstructors() {
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchInstructors = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await instructorService.getAll();
            setInstructors(res.data);
        } catch (e) {
            setError(e.message ?? "Failed to load instructors");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchInstructors();
    }, [fetchInstructors]);

    return { instructors, loading, error, refetch: fetchInstructors };
}