import {useState, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext.jsx";
import { tokenStorage } from "../utils/tokenStorage.js";
import { authService } from "../api/authService.js";
import { userStorage } from "../utils/userStorage.js";
import {clearLastActive, useInactivityLogout} from "../hooks/useInactivityLogout.js";
import {refreshStorage} from "../utils/refreshStorage.js";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = tokenStorage.get();
        const savedUser = userStorage.get();
        const refreshToken = refreshStorage.getRefresh();

        console.log("Token:", token);
        console.log("Saved User:", savedUser);
        console.log("Refresh Token:", refreshToken);

        if (token && savedUser) {
            setUser(savedUser);
        }

        setLoading(false);
    }, []);

    const logout = useCallback(async () => {
        try {
            const refreshToken = refreshStorage.getRefresh();

            if (refreshToken) {
                await authService.logout(refreshToken);
            }
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            tokenStorage.clear();
            refreshStorage.clearRefresh();
            userStorage.clear();
            clearLastActive();
            setUser(null);
        }
    }, []);

    useInactivityLogout(!!user, logout);

    const validateToken = async () => {
        try {
            const response = await authService.validate();
            setUser(response.data.user);
        } catch (err) {
            setUser(null);
        }
    };

    const refresh = async () => {
        try {
            const refreshToken = refreshStorage.getRefresh();

            if (!refreshToken) throw new Error("No refresh token");

            const response = await authService.refresh(refreshToken);

            const { accessToken, refreshToken: newRefresh } = response.data;

            tokenStorage.set(accessToken);
            refreshStorage.setRefresh(newRefresh);

            return accessToken;

        } catch (err) {
            logout();
            throw err;
        }
    };

    const resetPassword = async (token, newPassword) => {
        setError(null);
        try {
            const response = await authService.resetPassword(token, newPassword);
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Password reset failed";
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };

    const login = async (credentials) => {
        setError(null);
        try {
            const response = await authService.login(credentials);
            const { accessToken, refreshToken, user } = response.data;

            tokenStorage.set(accessToken);
            refreshStorage.setRefresh(refreshToken);
            userStorage.set(user);
            setUser(user);

            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Login failed";
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };

    const register = async (userData) => {
        setError(null);
        try {
            const response = await authService.register(userData);
            return response.data;
        } catch (err) {
            const errorMessage =
                err.response?.data?.message || "Registration failed";
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };

    const forgotPassword = async (email) => {
        setError(null);
        try {
            const response = await authService.forgotPassword(email);
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Request failed";
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };

    const value = {
        user,
        loading,
        error,
        login,
        register,
        refresh,
        validateToken,
        logout,
        resetPassword,
        forgotPassword,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
