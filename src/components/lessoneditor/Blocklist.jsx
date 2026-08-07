import { useRef, useState } from "react";
import BlockCard from "./Blockcard.jsx";

export default function BlockList({ blocks, onUpdate, onDelete, onReorder, selectedIds = [], onToggleSelect }) {
    const [draggingId, setDraggingId] = useState(null);
    const [overIndex, setOverIndex] = useState(null);
    const dragSrcIndex = useRef(null);

    const sorted = [...blocks].sort((a, b) => a.orderIndex - b.orderIndex);

    function handleDragStart(e, index) {
        dragSrcIndex.current = index;
        setDraggingId(sorted[index].id);
        e.dataTransfer.effectAllowed = "move";
    }

    function handleDragOver(e, index) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        setOverIndex(index);
    }

    function handleDrop(e, toIndex) {
        e.preventDefault();
        const fromIndex = dragSrcIndex.current;
        if (fromIndex === null || fromIndex === toIndex) return;

        const reordered = [...sorted];
        const [moved] = reordered.splice(fromIndex, 1);
        reordered.splice(toIndex, 0, moved);

        onReorder(reordered.map((b) => b.id));
        setDraggingId(null);
        setOverIndex(null);
        dragSrcIndex.current = null;
    }

    function handleDragEnd() {
        setDraggingId(null);
        setOverIndex(null);
        dragSrcIndex.current = null;
    }

    function handleMoveUp(blockId) {
        const idx = sorted.findIndex((b) => b.id === blockId);
        if (idx <= 0) return;
        const reordered = [...sorted];
        [reordered[idx - 1], reordered[idx]] = [reordered[idx], reordered[idx - 1]];
        onReorder(reordered.map((b) => b.id));
    }

    function handleMoveDown(blockId) {
        const idx = sorted.findIndex((b) => b.id === blockId);
        if (idx >= sorted.length - 1) return;
        const reordered = [...sorted];
        [reordered[idx], reordered[idx + 1]] = [reordered[idx + 1], reordered[idx]];
        onReorder(reordered.map((b) => b.id));
    }

    if (sorted.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-16 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </div>
                <p className="text-sm font-medium text-gray-500">No blocks yet</p>
                <p className="mt-1 text-xs text-gray-400">Use the buttons below to add your first block</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            {sorted.map((block, idx) => (
                <div
                    key={block.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, idx)}
                    onDragOver={(e) => handleDragOver(e, idx)}
                    onDrop={(e) => handleDrop(e, idx)}
                    onDragEnd={handleDragEnd}
                    className={`transition-transform ${
                        overIndex === idx && draggingId !== block.id
                            ? "scale-[1.01] ring-2 ring-blue-300 rounded-xl"
                            : ""
                    }`}
                >
                    <BlockCard
                        block={block}
                        totalBlocks={sorted.length}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                        onMoveUp={handleMoveUp}
                        onMoveDown={handleMoveDown}
                        isDragging={draggingId === block.id}
                        selected={selectedIds.includes(block.id)}
                        onToggleSelect={onToggleSelect}
                    />
                </div>
            ))}
        </div>
    );
}