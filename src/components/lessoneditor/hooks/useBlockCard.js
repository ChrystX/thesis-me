import { useEffect, useRef, useState } from "react";
import { parseDataJson, serializeDataJson } from "../BlockTypes.js";
import { useImageUpload } from "./useImageUpload.js";

export function useBlockCard(block, onUpdate) {
    const [localData, setLocalData] = useState(() => parseDataJson(block.dataJson));
    const debounceRef = useRef(null);

    // Sync when block data changes externally (after reorder/refetch)
    useEffect(() => {
        setLocalData(parseDataJson(block.dataJson));
    }, [block.dataJson]);

    // Cleanup debounce on unmount
    useEffect(() => {
        return () => clearTimeout(debounceRef.current);
    }, []);

    function handleDataChange(newData) {
        setLocalData(newData);
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            onUpdate(block.id, {
                orderIndex: block.orderIndex,
                dataJson: serializeDataJson(newData),
            });
        }, 600);
    }

    // ── Image-specific ────────────────────────────────────────────────────────
    const [imageSource, setImageSource] = useState("url");
    const [gdriveInput, setGdriveInput] = useState("");
    const [gdriveError, setGdriveError] = useState(null);
    const fileInputRef = useRef(null);

    const { uploading, error: uploadError, clearError, uploadToCloudinary, uploadToImgur, resolveGDriveUrl } =
        useImageUpload();

    // Reset image state when block changes
    useEffect(() => {
        setImageSource("url");
        setGdriveInput("");
        setGdriveError(null);
    }, [block.id]);

    async function handleFileSelected(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        const result =
            imageSource === "imgur"
                ? await uploadToImgur(file)
                : await uploadToCloudinary(file);
        if (result) handleDataChange({ ...localData, url: result.url, public_id: result.public_id });
        e.target.value = "";
    }

    function handleGDriveResolve() {
        setGdriveError(null);
        const direct = resolveGDriveUrl(gdriveInput);
        if (!direct) {
            setGdriveError("Could not parse a file ID from that link. Make sure it's a standard Google Drive sharing URL.");
            return;
        }
        handleDataChange({ ...localData, url: direct, public_id: "" });
        setGdriveInput("");
    }

    return {
        localData,
        handleDataChange,
        // image
        imageSource, setImageSource,
        gdriveInput, setGdriveInput,
        gdriveError, setGdriveError,
        fileInputRef,
        uploading, uploadError, clearError,
        handleFileSelected,
        handleGDriveResolve,
    };
}