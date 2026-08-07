import api from "../api.js";

export const categoryService = {
    getAll() {
        return api.get("/categories");
    },
    getById(id) {
        return api.get(`/categories/${id}`);
    },
    create(dto) {
        return api.post("/categories", dto);
    },
    update(id, dto) {
        return api.put(`/categories/${id}`, dto);
    },
    remove(id) {
        return api.delete(`/categories/${id}`);
    },
};