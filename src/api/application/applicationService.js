import api from "../api.js";

export const applicationService = {
    submit(formData) {
        return api.post("/application/submit", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    },

    getAll() {
        return api.get("/application");
    },

    getById(id) {
        return api.get(`/application/${id}`);
    },

    updateStatus(id, status) {
        return api.put(`/application/${id}/status`, { status });
    },

    delete(id) {
        return api.delete(`/application/${id}`);
    },

    downloadCV(id) {
        return api.get(`/application/${id}/download-cv`, { responseType: "blob" });
    },
};