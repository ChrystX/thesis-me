import api from "../api.js";

export const eventQueryService = {
    getEvents(filter = {}) {
        return api.get(`/events`, { params: filter });
    },

    getEventDetail(id) {
        return api.get(`/events/${id}`);
    },

    getStudentEventDetail(id) {
        return api.get(`/events/${id}/student-detail`);
    },

    getInstructorEventDetail(id) {
        return api.get(`/events/${id}/instructor-detail`);
    }
};