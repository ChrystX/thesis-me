import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import {useAuth} from "../../../hooks/useAuth.jsx";
import {validateLogin, validateRegister} from "../utils/authValidation.js";
import {useNavigate} from "react-router-dom";

export const useAuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [status, setStatus] = useState({
        loading: false,
        error: '',
        success: ''
    });

    const { login, register } = useAuth();
    const navigate = useNavigate();

    const updateField = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        setStatus({ loading: false, error: '', success: '' });
    };

    const resetForm = () => {
        setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    };

    const toggleMode = () => {
        setIsLogin(prev => !prev);
        resetForm();
        setStatus({ loading: false, error: '', success: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const error = isLogin
            ? validateLogin(formData)
            : validateRegister(formData);

        if (error) {
            setStatus({ loading: false, error, success: '' });
            return;
        }

        try {
            setStatus({ loading: true, error: '', success: '' });

            if (isLogin) {
                const data = await login({
                    username: formData.username,
                    password: formData.password
                });

                setStatus({loading: false, error: '', success: 'Login successful!'});
                // setTimeout(() => navigate('/dashboard'), 800);

                const role = data.user.roleName?.toLowerCase();
                if (role === 'admin') {
                    navigate('/admin/courses');
                } else if (role === 'instructor') {
                    navigate('/instructor/dashboard');
                } else if (role === 'student') {
                    navigate('/student/dashboard');
                } else {
                    navigate('/home');
                }
            } else {
                await register({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                });

                setStatus({
                    loading: false,
                    error: '',
                    success: 'Registration successful! Please login.'
                });

                setTimeout(() => {
                    setIsLogin(true);
                    resetForm();
                    setStatus({ loading: false, error: '', success: '' });
                }, 1500);
            }
        } catch (err) {
            setStatus({
                loading: false,
                error: err.message || 'Something went wrong',
                success: ''
            });
        }
    };

    return {
        isLogin,
        formData,
        status,
        updateField,
        toggleMode,
        handleSubmit
    };
};
