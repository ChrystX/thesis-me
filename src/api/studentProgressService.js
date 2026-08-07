import api from "./api.js";

export const studentProgressService = {
    getAllCoursesProgress() {
        return api.get("/StudentProgress/courses");
    },

    getCourseProgress(courseId) {
        return api.get(`/StudentProgress/course/${courseId}`);
    },

    getCompletedLessonIds(courseId) {
        return api.get(`/StudentProgress/course/${courseId}/lessons`);
    },

    getResumeLessonId(courseId) {
        return api.get(`/StudentProgress/course/${courseId}/resume`);
    },

    markLessonComplete(lessonId) {
        return api.post("/StudentProgress/complete", { lessonId });
    },

    unmarkLessonComplete(lessonId) {
        return api.delete("/StudentProgress/uncomplete", { data: { lessonId } });
    }
};