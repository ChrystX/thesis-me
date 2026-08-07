import {useCallback, useState} from "react";
import {contentObjectService} from "../../api/contentObjectService.js";

const BLOCK_TYPE_IDS = {
    Video: 2,
    Image: 3,
    Text: 1,
    ExternalLink: 5,
};

export function useExternalContentSearch() {
    const [source, setSource] = useState("youtube");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [importing, setImporting] = useState(false);
    const [error, setError] = useState(null);

    const search = useCallback(async (q) => {
        if (!q?.trim()) return;
        setLoading(true);
        setError(null);
        try {
            const res = await contentObjectService.externalSearch(source, q);
            setResults(res.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [source]);

    // instructor picks a result → saves it as a ContentObject → returns it
    const importResult = useCallback(async (result) => {
        setImporting(true);
        setError(null);
        try {
            const res = await contentObjectService.create({
                title: result.title,
                blockTypeId: BLOCK_TYPE_IDS[result.suggestedBlockTypeName],
                dataJson: result.suggestedDataJson,
            });
            return res.data;
        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setImporting(false);
        }
    }, []);

    return {
        source,
        setSource,
        results,
        loading,
        importing,
        error,
        search,
        importResult,
    };
}