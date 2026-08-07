import api from "./api.js";

export const courseService = {
    // GET /api/courses
    getAll() {
        return api.get("/courses");
    },

    // GET /api/courses/active
    getActive() {
        return api.get("/courses/active");
    },

    // GET /api/courses/{id}
    getById(id) {
        return api.get(`/courses/${id}`);
    },

    // POST /api/courses
    create(dto) {
        return api.post("/courses", dto);
    },

    // GET /api/courses/instructor/{instructorId}
    getByInstructor(instructorId) {
        return api.get(`/courses/instructor/${instructorId}`);
    },

    // POST /api/courses/bulk
    bulkCreate(dtos) {
        return api.post("/courses/bulk", dtos);
    },

    // PUT /api/courses/{id}
    update(id, dto) {
        return api.put(`/courses/${id}`, dto);
    },

    // DELETE /api/courses/{id}
    remove(id) {
        return api.delete(`/courses/${id}`);
    },
};
