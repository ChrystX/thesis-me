import {contentObjectService} from "../../api/contentObjectService.js";
import {useCallback, useState} from "react";

export function useContentVersions() {
    const [versions, setVersions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchVersions = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            const res = await contentObjectService.getVersions(id);
            setVersions(res.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const createVersion = useCallback(async (id, dataJson) => {
        try {
            const res = await contentObjectService.saveDraft(id, { dataJson });
            return res.data;
        } catch (err) {
            setError(err.message);
            return null;
        }
    }, []);

    const publishVersion = useCallback(async (id) => {
        try {
            const res = await contentObjectService.publish(id);
            return res.data;
        } catch (err) {
            setError(err.message);
            return null;
        }
    }, []);

    return {
        versions,
        loading,
        error,
        fetchVersions,
        createVersion,
        publishVersion,
    };
}