import api from "../api.js";

export const courseSectionService = {
    getAll() {
        return api.get("/CourseSections");
    },
    getById(id) {
        return api.get(`/CourseSections/${id}`);
    },
    create(dto) {
        return api.post("/CourseSections", dto);
    },

    getByCourseId(courseId) {
        return api.get("/coursesections").then(res => ({
            data: res.data
                .filter(section => section.courseId === Number(courseId))
                .sort((a, b) => a.sortOrder - b.sortOrder)
        }));
    },

    update(id, dto) {
        return api.put(`/CourseSections/${id}`, dto);
    },
    remove(id) {
        return api.delete(`/CourseSections/${id}`);
    },
};