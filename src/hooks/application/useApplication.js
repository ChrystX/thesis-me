import { useState, useCallback } from "react";
import {applicationService} from "../../api/application/applicationService.js";

export function useApplication() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [applicationId, setApplicationId] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const submit = useCallback(async (formData) => {
        try {
            setLoading(true);
            setError(null);
            const res = await applicationService.submit(formData);
            setApplicationId(res.data.applicationId);
            setSubmitted(true);
        } catch (e) {
            setError(e.response?.data?.message ?? "Failed to submit application.");
        } finally {
            setLoading(false);
        }
    }, []);

    const reset = useCallback(() => {
        setLoading(false);
        setError(null);
        setApplicationId(null);
        setSubmitted(false);
    }, []);

    return { submit, loading, error, applicationId, submitted, reset };
}