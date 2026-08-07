import api from "./api.js";

export const lessonService = {

    getLesson(lessonId) {
        return api.get(`/lessons/${lessonId}`);
    },

    getLessons(sectionId) {
        return api.get(`/sections/${sectionId}/lessons`);
    },

    createLesson(sectionId, dto) {
        return api.post(`/sections/${sectionId}/lessons`, dto);
    },

    updateLesson(sectionId, lessonId, dto) {
        return api.put(`/sections/${sectionId}/lessons/${lessonId}`, dto);
    },

    deleteLesson(sectionId, lessonId) {
        return api.delete(`/sections/${sectionId}/lessons/${lessonId}`);
    },

    updateSettings(lessonId, dto) {
        return api.patch(`/lessons/${lessonId}/settings`, dto);
    },
};