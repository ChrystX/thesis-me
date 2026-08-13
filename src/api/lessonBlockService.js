import api from "./api.js";

export const lessonBlockService = {

    getBlocks(lessonId) {
        return api.get(`/lessons/${lessonId}/blocks`);
    },

    createBlock(lessonId, dto) {
        return api.post(`/lessons/${lessonId}/blocks`, dto);
    },

    groupBlocks(lessonId, dto) {
        return api.post(`/lessons/${lessonId}/blocks/group`, dto);
    },

    ungroupBlock(lessonId, blockId) {
        return api.post(`/lessons/${lessonId}/blocks/${blockId}/ungroup`);
    },

    updateBlock(lessonId, blockId, dto) {
        return api.put(`/lessons/${lessonId}/blocks/${blockId}`, dto);
    },

    deleteBlock(lessonId, blockId) {
        return api.delete(`/lessons/${lessonId}/blocks/${blockId}`);
    }
};