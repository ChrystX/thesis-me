import api from "../api.js";


export const blogDetailService = {
    getById(blogId) {
        return api.get(`/blogdetails/${blogId}`);
    },

    getAll() {
        return api.get("/blogdetails");
    },

    create(dto) {
        return api.post("/blogdetails", dto);
    },

    update(blogId, dto) {
        return api.put(`/blogdetails/${blogId}`, dto);
    },

    remove(blogId) {
        return api.delete(`/blogdetails/${blogId}`);
    },
};