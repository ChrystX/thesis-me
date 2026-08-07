import api from "../api.js";

export const courseInstructorService = {

    getAll() {
        return api.get("/courseinstructors");
    },

    getByCourseId(courseId) {
        return api.get(`/courseinstructors/course/${courseId}`);
    },

    getByInstructorId(instructorId) {
        return api.get(`/courseinstructors/instructor/${instructorId}`);
    },

    create(dto) {
        return api.post("/courseinstructors", dto);
    },

    remove(courseId, instructorId) {
        return api.delete(`/courseinstructors/course/${courseId}/instructor/${instructorId}`);
    }

};