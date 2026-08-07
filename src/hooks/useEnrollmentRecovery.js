// useEnrollmentRecovery.js
import { useEffect, useState, useCallback } from "react";
import { enrollmentRecoveryService } from "../api/enrollmentRecoveryService.js";

export function useEnrollmentRecovery() {
    const [missingEnrollments, setMissingEnrollments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [recovering, setRecovering] = useState(false);
    const [error, setError] = useState(null);

    const fetchMissing = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await enrollmentRecoveryService.getMissingEnrollments();
            setMissingEnrollments(res.data);
        } catch (e) {
            setError(e.message ?? "Failed to load missing enrollments");
        } finally {
            setLoading(false);
        }
    }, []);

    const recover = useCallback(async (orderId) => {
        try {
            setRecovering(true);
            setError(null);
            await enrollmentRecoveryService.recoverEnrollment(orderId);
            await fetchMissing(); // refresh list — recovered row disappears
        } catch (e) {
            setError(e.message ?? "Failed to recover enrollment");
        } finally {
            setRecovering(false);
        }
    }, [fetchMissing]);

    useEffect(() => {
        fetchMissing();
    }, [fetchMissing]);

    return { missingEnrollments, loading, recovering, error, refetch: fetchMissing, recover };
}