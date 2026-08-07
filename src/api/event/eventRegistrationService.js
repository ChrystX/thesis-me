import api from "../api.js";


export const eventRegistrationService = {
    register(eventId) {
        return api.post(`/events/${eventId}/register`);
    },

    cancelRegistration(eventId) {
        return api.delete(`/events/${eventId}/register`);
    },

    checkRegistration(eventId) {
        return api.get(`/events/${eventId}/register`);
    },

    getRegistrations(eventId) {
        return api.get(`/events/${eventId}/registrations`);
    }
};