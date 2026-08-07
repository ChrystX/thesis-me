import api from "../api.js";

export const courseSectionService = {

    getAll() {
        return api.get("/coursesections");
    },

    getById(id) {
        return api.get(`/coursesections/${id}`);
    },

    getByCourseId(courseId) {
        return api.get("/coursesections").then(res => ({
            data: res.data
                .filter(section => section.courseId === Number(courseId))
                .sort((a, b) => a.sortOrder - b.sortOrder)
        }));
    },

    create(dto) {
        return api.post("/coursesections", dto);
    },

    update(id, dto) {
        return api.put(`/coursesections/${id}`, dto);
    },

    remove(id) {
        return api.delete(`/coursesections/${id}`);
    }

};