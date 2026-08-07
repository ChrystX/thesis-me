import { useState, useCallback } from "react";
import {contentObjectService} from "../../api/contentObjectService.js";

export function useContentObjects() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const search = useCallback(async (blockTypeId, q = "") => {
        setLoading(true);
        setError(null);
        try {
            const res = await contentObjectService.search(blockTypeId, q);
            setResults(res.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const create = useCallback(async (dto) => {
        try {
            const res = await contentObjectService.create(dto);
            return res.data;
        } catch (err) {
            setError(err.message);
            return null;
        }
    }, []);

    const saveDraft = useCallback(async (id, dto) => {
        try {
            const res = await contentObjectService.saveDraft(id, dto);
            return res.data;
        } catch (err) {
            setError(err.message);
            return null;
        }
    }, []);

    const publish = useCallback(async (id) => {
        try {
            const res = await contentObjectService.publish(id);
            return res.data;
        } catch (err) {
            setError(err.message);
            return null;
        }
    }, []);

    const remove = useCallback(async (id, force = false) => {
        try {
            await contentObjectService.delete(id, force);
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        }
    }, []);

    const group = useCallback(async (dto) => {
        try {
            const res = await contentObjectService.group(dto);
            return res.data;
        } catch (err) {
            setError(err.message);
            return null;
        }
    }, []);

    const promote = useCallback(async (blockId, title) => {
        try {
            const res = await contentObjectService.promote(blockId, { title });
            return res.data;
        } catch (err) {
            setError(err.message);
            return null;
        }
    }, []);

    return {
        results,
        loading,
        error,
        search,
        create,
        saveDraft,
        publish,
        remove,
        promote,
        group,
    };
}