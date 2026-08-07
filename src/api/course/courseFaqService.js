import api from "../api.js";

export const courseFaqService = {
    getAll() {
        return api.get("/CourseFaqs");
    },
    getById(id) {
        return api.get(`/CourseFaqs/${id}`);
    },

    getByCourseId(courseId) {
        return api.get("/coursefaqs").then(res => ({
            data: res.data.filter(
                faq => faq.courseId === Number(courseId)
            )
        }));
    },

    create(dto) {
        return api.post("/CourseFaqs", dto);
    },
    update(id, dto) {
        return api.put(`/CourseFaqs/${id}`, dto);
    },
    remove(id) {
        return api.delete(`/CourseFaqs/${id}`);
    },
};