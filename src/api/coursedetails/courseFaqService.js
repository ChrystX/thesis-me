import api from "../api.js";

export const courseFaqService = {

    getAll() {
        return api.get("/coursefaqs");
    },

    getById(id) {
        return api.get(`/coursefaqs/${id}`);
    },

    getByCourseId(courseId) {
        return api.get("/coursefaqs").then(res => ({
            data: res.data.filter(
                faq => faq.courseId === Number(courseId)
            )
        }));
    },

    create(dto) {
        return api.post("/coursefaqs", dto);
    },

    update(id, dto) {
        return api.put(`/coursefaqs/${id}`, dto);
    },

    remove(id) {
        return api.delete(`/coursefaqs/${id}`);
    }

};