import {useCallback, useEffect, useState} from "react";
import {lessonBlockService} from "../../api/lessonBlockService.js";

export function useLessonBlocks(lessonId) {
    const [blocks, setBlocks] = useState([]);

    const fetchBlocks = useCallback (async () => {
        if (!lessonId) return;
        try {
            const res = await lessonBlockService.getBlocks(lessonId);
            setBlocks(res.data);
        } catch (err) {
            console.error("Failed to fetch blocks", err);
            console.error("createBlock error:", err.response?.data, err.response?.status);
            throw err;
        }
    }, [lessonId]);

    useEffect(() => {
        fetchBlocks();
    }, [fetchBlocks]);

    const createBlock = async (dto) => {
        await lessonBlockService.createBlock(lessonId, dto);
        fetchBlocks();
    };

    const updateBlock = async (blockId, dto) => {
        await lessonBlockService.updateBlock(lessonId, blockId, dto);
        fetchBlocks();
    };

    const deleteBlock = async (blockId) => {
        await lessonBlockService.deleteBlock(lessonId, blockId);
        fetchBlocks();
    };

    const groupBlocks = async (dto) => {
        await lessonBlockService.groupBlocks(lessonId, dto);
        fetchBlocks();
    };

    const ungroupBlock = async (blockId) => {
        await lessonBlockService.ungroupBlock(lessonId, blockId);
        fetchBlocks();
    };

    return {
        blocks,
        createBlock,
        updateBlock,
        deleteBlock,
        groupBlocks,
        ungroupBlock,
        refetch: fetchBlocks
    };
}