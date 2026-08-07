import api from "../api.js";

export const courseDetailService = {
    getAll() {
        return api.get("/CourseDetails");
    },
    getById(id) {
        return api.get(`/CourseDetails/${id}`);
    },

    getByCourseId(courseId) {
        return api.get(`/CourseDetails`).then(res => {
            const detail = res.data.find(
                d => d.courseId === Number(courseId)
            );

            if (!detail) {
                throw new Error("Course detail not found");
            }

            return { data: detail };
        });
    },

    create(dto) {
        return api.post("/CourseDetails", dto);
    },
    update(id, dto) {
        return api.put(`/CourseDetails/${id}`, dto);
    },
    remove(id) {
        return api.delete(`/CourseDetails/${id}`);
    },
};