import api from "./api.js";

export const authService = {
    login(dto) {
        return api.post("/auth/login", dto);
    },

    register(dto) {
        return api.post("/auth/register", dto);
    },

    forgotPassword(email) {
        return api.post("/auth/forgot-password", { email });
    },

    createInstructor(dto) {
        return api.post("/auth/create-instructor", dto);
    },

    logout(refreshToken) {
        return api.post("/auth/logout", { refreshToken });
    },

    refresh(refreshToken) {
        return api.post("/auth/refresh", { refreshToken });
    },

    me() {
        return api.get("/auth/me");
    },

    validate() {
        return api.get("/auth/validate");
    },

    resetPassword(token, newPassword) {
        return api.post("/auth/reset-password", { token, newPassword });
    }
};
