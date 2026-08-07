// api/event/eventDetailService.js
import api from "../api.js";

export const eventDetailService = {
    getStudentDetail(eventId) {
        return api.get(`/events/${eventId}/student-detail`);
    }
};