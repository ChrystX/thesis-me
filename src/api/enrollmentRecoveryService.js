// enrollmentRecoveryService.js
import api from "./api.js";

export const enrollmentRecoveryService = {
    getMissingEnrollments() {
        return api.get("/admin/enrollment-recovery/missing-enrollments");
    },

    recoverEnrollment(orderId) {
        return api.post(`/admin/enrollment-recovery/recover/${orderId}`);
    },
};