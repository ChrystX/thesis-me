import api from "../api.js";

export const blogTagService = {
    getAll() {
        return api.get("/blogtags");
    },

    getByBlogAndTag(blogId, tag) {
        return api.get(`/blogtags/${blogId}/${tag}`);
    },

    create(dto) {
        return api.post("/blogtags", dto);
    },

    update(blogId, tag, dto) {
        return api.put(`/blogtags/${blogId}/${tag}`, dto);
    },

    remove(blogId, tag) {
        return api.delete(`/blogtags/${blogId}/${tag}`);
    },
};