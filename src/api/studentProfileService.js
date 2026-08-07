// services/studentProfileService.js
import api from "./api.js";

export const studentProfileService = {
    getProfile() {
        return api.get("/student/profile").then(res => res.data);
    },

    updateProfile(dto) {
        return api.put("/student/profile", dto).then(res => res.data);
    },
};