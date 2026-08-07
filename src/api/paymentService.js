import api from "./api.js";

export const paymentService = {

    createPayment(dto) {
        return api.post("/payments/create", dto).then(res => res.data);
    },

    checkEnrollment(courseId) {
        return api.get(`/payments/check/${courseId}`).then(res => res.data);
    },

    getAllPayments(params = {}) {
        return api.get("/payments", { params });
        // params: { status, dateFrom, dateTo, search, page, pageSize }
    },

    syncPayment(orderId) {
        return api.post(`/payments/sync/${orderId}`).then(res => res.data);
    },

}