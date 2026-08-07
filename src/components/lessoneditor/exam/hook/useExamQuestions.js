import { useRef, useState } from "react";
import {useLessonBlocks} from "../../../../hooks/lesson/useLessonBlocks.js";
import {BLOCK_TYPE, serializeDataJson} from "../../BlockTypes.js";

function defaultQuestionFor(type) {
    const base = { type, question: "", points: 1, weight: 1 };
    switch (type) {
        case "multiple_choice":
            return { ...base, options: ["", ""], correct_index: 0 };
        case "multiple_select":
            return { ...base, options: ["", ""], correct_indices: [] };
        case "true_false":
            return { ...base, correct_answer: true };
        case "fill_in_blank":
            return { ...base, correct_answer: "" };
        default:
            return base;
    }
}

export function useExamQuestions(lessonId) {
    const { blocks, createBlock, updateBlock, deleteBlock } = useLessonBlocks(lessonId);
    const [adding, setAdding] = useState(false);

    const questions = [...blocks]
        .filter((b) => b.blockTypeId === BLOCK_TYPE.QUESTION)
        .sort((a, b) => a.orderIndex - b.orderIndex);

    const totalWeight = questions.reduce((sum, b) => {
        try { return sum + (JSON.parse(b.dataJson)?.weight ?? 1); } catch { return sum + 1; }
    }, 0);

    async function addQuestion(type) {
        setAdding(true);
        await createBlock({
            blockTypeId: BLOCK_TYPE.QUESTION,
            orderIndex: questions.length,
            dataJson: serializeDataJson(defaultQuestionFor(type)),
        });
        setAdding(false);
    }

    async function addRloQuestion(rlo) {
        setAdding(true);
        await createBlock({
            blockTypeId: BLOCK_TYPE.QUESTION,
            orderIndex: questions.length,
            dataJson: "{}",
            contentObjectId: rlo.id,
        });
        setAdding(false);
    }

    async function updateQuestion(blockId, dto) {
        await updateBlock(blockId, dto);
    }

    async function deleteQuestion(blockId) {
        if (!window.confirm("Delete this question?")) return;
        await deleteBlock(blockId);
    }

    async function reorder(orderedIds) {
        const updates = orderedIds
            .map((id, newIndex) => {
                const block = questions.find((b) => b.id === id);
                if (!block || block.orderIndex === newIndex) return null;
                return updateBlock(id, { orderIndex: newIndex, dataJson: block.dataJson });
            })
            .filter(Boolean);
        await Promise.all(updates);
    }

    function moveUp(blockId) {
        const idx = questions.findIndex((b) => b.id === blockId);
        if (idx <= 0) return;
        const next = [...questions];
        [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
        reorder(next.map((b) => b.id));
    }

    function moveDown(blockId) {
        const idx = questions.findIndex((b) => b.id === blockId);
        if (idx >= questions.length - 1) return;
        const next = [...questions];
        [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
        reorder(next.map((b) => b.id));
    }

    // drag-and-drop
    const dragSrcIndex = useRef(null);
    const [draggingId, setDraggingId] = useState(null);
    const [overIndex, setOverIndex] = useState(null);

    function onDragStart(e, index) {
        dragSrcIndex.current = index;
        setDraggingId(questions[index].id);
        e.dataTransfer.effectAllowed = "move";
    }

    function onDragOver(e, index) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        setOverIndex(index);
    }

    function onDrop(e, toIndex) {
        e.preventDefault();
        const fromIndex = dragSrcIndex.current;
        if (fromIndex === null || fromIndex === toIndex) return;
        const next = [...questions];
        const [moved] = next.splice(fromIndex, 1);
        next.splice(toIndex, 0, moved);
        reorder(next.map((b) => b.id));
        setDraggingId(null);
        setOverIndex(null);
        dragSrcIndex.current = null;
    }

    function onDragEnd() {
        setDraggingId(null);
        setOverIndex(null);
        dragSrcIndex.current = null;
    }

    return {
        questions,
        totalWeight,
        adding,
        addQuestion,
        addRloQuestion,
        updateQuestion,
        deleteQuestion,
        moveUp,
        moveDown,
        drag: { draggingId, overIndex, onDragStart, onDragOver, onDrop, onDragEnd },
    };
}