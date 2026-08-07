import api from "./api.js";

export const studentCourseService = {

    getMyCourses() {
        return api.get("/studentcourses/my-courses")
            .then(res => res.data);
    },

    checkEnrollment(courseId) {
        return api.get(`/payments/check/${courseId}`).then(res => res.data);
    }

}