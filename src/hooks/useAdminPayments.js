import { useState, useEffect, useCallback } from "react";
import { paymentService } from "../api/paymentService.js";

export const useAdminPayments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({
        status: "",
        dateFrom: "",
        dateTo: "",
        search: "",
        page: 1,
        pageSize: 10,
    });

    const fetchPayments = useCallback(async (overrideFilters) => {
        try {
            setLoading(true);
            setError(null);
            const activeFilters = overrideFilters ?? filters;
            const cleaned = Object.fromEntries(
                Object.entries(activeFilters).filter(([_, v]) => v !== "" && v !== null)
            );
            const response = await paymentService.getAllPayments(cleaned);
            setPayments(response.data.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load payments.");
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchPayments();
    }, [fetchPayments]);

    const updateFilter = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value,
            page: key !== "page" ? 1 : value, // reset to page 1 on any filter change
        }));
    };

    const resetFilters = () => {
        setFilters({ status: "", dateFrom: "", dateTo: "", search: "", page: 1, pageSize: 10 });
    };

    return {
        payments,
        loading,
        error,
        filters,
        updateFilter,
        resetFilters,
        refetch: fetchPayments,
    };
};