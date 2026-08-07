import api from "./api.js";

export const userService = {
    getUsers() {
        return api.get("/admin/users").then(res => res.data);
    },

    getUser(id) {
        return api.get(`/admin/users/${id}`).then(res => res.data);
    },

    createUser(dto) {
        return api.post("/admin/users", dto).then(res => res.data);
    },

    resendSetup(id) {
        return api.post(`/admin/users/${id}/resend-setup`).then(res => res.data);
    },

    updateUser(id, dto) {
        return api.put(`/admin/users/${id}`, dto).then(res => res.data);
    },

    toggleActive(id) {
        return api.put(`/admin/users/${id}/toggle-active`).then(res => res.data);
    },

    changeRole(id, roleId) {
        return api.put(`/admin/users/${id}/role`, { roleId }).then(res => res.data);
    },

    deleteUser(id) {
        return api.delete(`/admin/users/${id}`).then(res => res.data);
    }
};