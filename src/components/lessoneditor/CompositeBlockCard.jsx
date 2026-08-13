import { useEffect, useRef, useState } from "react";
import {BLOCK_TYPE, BLOCK_TYPE_META, parseDataJson, serializeDataJson} from "./BlockTypes.js";
import TextBlock from "./blocktypes/TextBlock.jsx";
import VideoBlock from "./blocktypes/VideoBlock.jsx";
import ImageBlock from "./blocktypes/ImageBlock.jsx";
import QuizBlock from "./blocktypes/QuizBlock.jsx";
import ExternalLinkBlock from "./blocktypes/ExternalLinkBlocks.jsx";
import { GripVertical, ArrowUp, ArrowDown, Trash2, Layers, Ungroup, Pencil, Check } from "lucide-react";

const BLOCK_COMPONENTS = {
    [BLOCK_TYPE.TEXT]: TextBlock,
    [BLOCK_TYPE.VIDEO]: VideoBlock,
    [BLOCK_TYPE.IMAGE]: ImageBlock,
    [BLOCK_TYPE.QUIZ]: QuizBlock,
    [BLOCK_TYPE.EXTERNAL_LINK]: ExternalLinkBlock,
};

// One child of a composite: renders read-only until "Edit" is clicked, then
// becomes a live editor that debounces saves through onUpdateChild.
function CompositeChild({ child, onUpdateChild }) {
    const meta = BLOCK_TYPE_META[child.blockTypeId];
    const ChildComponent = BLOCK_COMPONENTS[child.blockTypeId];

    const [editing, setEditing] = useState(false);
    const [localData, setLocalData] = useState(() => parseDataJson(child.dataJson));
    const debounceRef = useRef(null);
    const [saving, setSaving] = useState(false);

    // keep in sync if the block list refetches with newer data
    useEffect(() => {
        setLocalData(parseDataJson(child.dataJson));
    }, [child.dataJson]);

    useEffect(() => () => clearTimeout(debounceRef.current), []);

    if (!ChildComponent) return null;

    function handleChange(newData) {
        setLocalData(newData);
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(async () => {
            setSaving(true);
            try {
                await onUpdateChild(child.id, serializeDataJson(newData));
            } finally {
                setSaving(false);
            }
        }, 600);
    }

    return (
        <div className="rounded-lg border border-gray-100 bg-white p-3">
            <div className="mb-2 flex items-center justify-between">
                <span className={`inline-block rounded-md border px-2 py-0.5 text-[11px] font-medium ${meta?.color ?? ""}`}>
                    {meta?.label ?? "Content"}
                </span>

                {onUpdateChild && (
                    <button
                        onClick={() => setEditing((v) => !v)}
                        title={editing ? "Done editing" : "Edit this item"}
                        className={`flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium transition ${
                            editing
                                ? "bg-purple-100 text-purple-700"
                                : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                        }`}
                    >
                        {editing ? <Check className="h-3 w-3" /> : <Pencil className="h-3 w-3" />}
                        {editing ? (saving ? "Saving…" : "Done") : "Edit"}
                    </button>
                )}
            </div>

            <ChildComponent data={localData} onChange={handleChange} readOnly={!editing} />
        </div>
    );
}

export default function CompositeBlockCard({ block, totalBlocks, onDelete, onMoveUp, onMoveDown, onUngroup, onUpdateChild, isDragging = false }) {
    return (
        <div
            className={`rounded-xl border bg-purple-50/30 shadow-sm transition-shadow ${
                isDragging ? "opacity-50 shadow-xl ring-2 ring-blue-400" : "border-purple-200 hover:border-purple-300"
            }`}
        >
            <div className="flex items-center gap-2 rounded-t-xl border-b border-purple-100 bg-purple-50 px-3 py-2">
                <span className="cursor-grab text-gray-300 hover:text-gray-500" title="Drag to reorder">
                    <GripVertical className="h-4 w-4" />
                </span>

                <span className="flex items-center gap-1 rounded-md border border-purple-200 bg-white px-2 py-0.5 text-xs font-medium text-purple-700">
                    <Layers className="h-3 w-3" />
                    Group ({block.children?.length ?? 0})
                </span>

                <span className="text-xs text-gray-400">#{block.orderIndex + 1}</span>

                <div className="flex-1" />

                {onUngroup && (
                    <button
                        onClick={() => onUngroup(block.id)}
                        title="Split back into individual blocks"
                        className="flex items-center gap-1 rounded-md border border-purple-200 bg-white px-2 py-0.5 text-xs font-medium text-purple-700 hover:bg-purple-100"
                    >
                        <Ungroup className="h-3.5 w-3.5" />
                        Ungroup
                    </button>
                )}

                <div className="flex items-center gap-0.5">
                    <button onClick={() => onMoveUp(block.id)} disabled={block.orderIndex === 0}
                            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-30">
                        <ArrowUp className="h-4 w-4" />
                    </button>
                    <button onClick={() => onMoveDown(block.id)} disabled={block.orderIndex === totalBlocks - 1}
                            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-30">
                        <ArrowDown className="h-4 w-4" />
                    </button>
                    <button onClick={() => onDelete(block.id)}
                            className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="space-y-3 p-3">
                {(block.children ?? []).map((child) => (
                    <CompositeChild key={child.id} child={child} onUpdateChild={onUpdateChild} />
                ))}
            </div>
        </div>
    );
}
