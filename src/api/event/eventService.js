import api from "../api.js";


export const eventService = {
    createEvent(dto) {
        return api.post(`/events`, dto);
    },

    updateEvent(id, dto) {
        return api.put(`/events/${id}`, dto);
    },

    deleteEvent(id) {
        return api.delete(`/events/${id}`);
    },

    toggleEventStatus(id, isActive) {
        return api.patch(`/events/${id}/status`, isActive);
    }
};