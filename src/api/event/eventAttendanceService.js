import api from "../api.js";


export const eventAttendanceService = {
    checkIn(eventId) {
        return api.post(`/events/${eventId}/attendance/checkin`);
    },

    markAttendance(eventId, dto) {
        return api.post(`/events/${eventId}/attendance/mark`, dto);
    },

    bulkMarkAttendance(eventId, dto) {
        return api.post(`/events/${eventId}/attendance/bulk-mark`, dto);
    },

    getAttendanceReport(eventId) {
        return api.get(`/events/${eventId}/attendance/report`);
    },

    getAttendanceStats(eventId) {
        return api.get(`/events/${eventId}/attendance/stats`);
    },

    getMyAttendance(eventId) {
        return api.get(`/events/${eventId}/attendance/me`);
    }
};