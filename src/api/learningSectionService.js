import api from "./api.js";

export const learningSectionService = {
    getSections(courseId) {
        return api.get(`/courses/${courseId}/learning-sections`);
    },

    getSectionsAdmin(courseId) {
        return api.get(`/courses/${courseId}/learning-sections/admin`);
    },

    getSyllabus(courseId) {
        return api.get(`/courses/${courseId}/learning-sections/syllabus`);
    },

    createSection(courseId, dto) {
        return api.post(`/courses/${courseId}/learning-sections`, dto);
    },

    updateSection(courseId, sectionId, dto) {
        return api.put(`/courses/${courseId}/learning-sections/${sectionId}`, dto);
    },

    deleteSection(courseId, sectionId) {
        return api.delete(`/courses/${courseId}/learning-sections/${sectionId}`);
    }
}