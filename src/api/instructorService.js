import api from "./api.js";

export const instructorService = {
    // GET /api/instructors
    getAll() {
        return api.get("/instructors");
    },

    // GET /api/instructors/{id}
    getById(id) {
        return api.get(`/instructors/${id}`);
    },

    getByUserId(userId) {
        return api.get(`/instructors/by-user/${userId}`);
    },

    // PUT /api/instructors/{id}
    update(id, dto) {
        return api.put(`/instructors/${id}`, dto);
    },
};