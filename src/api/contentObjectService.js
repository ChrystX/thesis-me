import api from "./api.js";

export const contentObjectService = {
    // local RLO search
    search(blockTypeId, q) {
        const params = new URLSearchParams();
        if (blockTypeId) params.set("blockTypeId", blockTypeId);
        if (q) params.set("q", q);
        return api.get(`/content-objects?${params}`);
    },

    // external search — source: "youtube" | "oersi" | "wikimedia"
    externalSearch(source, q, limit = 10) {
        const params = new URLSearchParams({ source, q, limit });
        return api.get(`/content-objects/external-search?${params}`);
    },

    create(dto) {
        return api.post("/content-objects", dto);
    },

    saveDraft(id, dto) {
        return api.patch(`/content-objects/${id}/draft`, dto);
    },

    // direct, non-versioned update — used for editing a composite group's children in place
    update(id, dto) {
        return api.patch(`/content-objects/${id}`, dto);
    },

    publish(id) {
        return api.post(`/content-objects/${id}/publish`);
    },

    delete(id, force = false) {
        return api.delete(`/content-objects/${id}${force ? "?force=true" : ""}`);
    },

    group(dto) {
        return api.post("/content-objects/group", dto);
    },

    promote(blockId, dto) {
        return api.post(`/content-objects/promote/${blockId}`, dto);
    },

    getVersions(id) {
        return api.get(`/content-objects/${id}/versions`);
    },
};