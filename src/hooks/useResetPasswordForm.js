import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { authService } from "../../../services/authService.js";

export const useResetPasswordForm = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
    const [status, setStatus] = useState({ loading: false, error: null, success: null });

    const updateField = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            setStatus({ loading: false, error: "Invalid or missing reset link", success: null });
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setStatus({ loading: false, error: "Passwords do not match", success: null });
            return;
        }

        setStatus({ loading: true, error: null, success: null });

        try {
            await authService.resetPassword(token, formData.password);
            setStatus({ loading: false, error: null, success: "Password set! Redirecting to login..." });
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            const msg = err.response?.data?.message || "Something went wrong";
            setStatus({ loading: false, error: msg, success: null });
        }
    };

    return { formData, status, updateField, handleSubmit };
};