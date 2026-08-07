import api from "../api.js";

export const blogService = {
    getPublished(limit = null) {
        return api.get("/blogs", { params: limit ? { limit } : {} });
    },

    getAll() {
        return api.get("/blogs/all");
    },

    getById(id) {
        return api.get(`/blogs/${id}`);
    },

    incrementView(id) {
        return api.post(`/blogs/${id}/increment-view`);
    },

    create(dto) {
        return api.post("/blogs", dto);
    },

    update(id, dto) {
        return api.put(`/blogs/${id}`, dto);
    },

    remove(id) {
        return api.delete(`/blogs/${id}`);
    },
};