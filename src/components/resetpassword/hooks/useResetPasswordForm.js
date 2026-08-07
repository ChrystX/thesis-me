import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth.jsx";

export const useResetPasswordForm = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();
    const { resetPassword, forgotPassword } = useAuth();

    const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
    const [status, setStatus] = useState({ loading: false, error: "", success: "" });

    useEffect(() => {
        if (!token) return;
        // token exists but is garbage — caught later on submit
    }, [token]);

    const updateField = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        setStatus({ loading: false, error: "", success: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // No token → forgot password flow
        if (!token) {
            if (!formData.email) {
                setStatus({ loading: false, error: "Please enter your email.", success: "" });
                return;
            }
            try {
                setStatus({ loading: true, error: "", success: "" });
                await forgotPassword(formData.email);
                setStatus({ loading: false, error: "", success: "Check your email for a reset link." });
            } catch (err) {
                setStatus({ loading: false, error: err.message || "Request failed.", success: "" });
            }
            return;
        }

        // Has token → reset password flow
        if (formData.password !== formData.confirmPassword) {
            setStatus({ loading: false, error: "Passwords do not match.", success: "" });
            return;
        }
        if (formData.password.length < 8) {
            setStatus({ loading: false, error: "Password must be at least 8 characters.", success: "" });
            return;
        }

        try {
            setStatus({ loading: true, error: "", success: "" });
            await resetPassword(token, formData.password);
            setStatus({ loading: false, error: "", success: "Password reset! Redirecting..." });
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setStatus({ loading: false, error: err.message || "Reset failed.", success: "" });
        }
    };

    return { token, formData, status, updateField, handleSubmit };
};