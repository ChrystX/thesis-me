import { GripVertical, ChevronUp, ChevronDown, Trash2 } from "lucide-react";
import { parseDataJson, serializeDataJson } from "../BlockTypes.js";
import QuestionBlock from "../blocktypes/QuestionBlock.jsx";
import {useState} from "react";
import {useContentObjects} from "../../../hooks/contentobject/useContentObjects.js";
import { BookmarkPlus } from "lucide-react";

const TYPE_BADGE = {
    multiple_choice: { label: "MC",  color: "bg-violet-50 text-violet-700 border-violet-200" },
    multiple_select: { label: "MS",  color: "bg-purple-50 text-purple-700 border-purple-200" },
    true_false:      { label: "T/F", color: "bg-blue-50 text-blue-700 border-blue-200" },
    fill_in_blank:   { label: "FIB", color: "bg-amber-50 text-amber-700 border-amber-200" },
};

export default function ExamQuestionCard({
                                             block,
                                             index,
                                             totalBlocks,
                                             onUpdate,
                                             onDelete,
                                             onMoveUp,
                                             onMoveDown,
                                             isDragging = false,
                                         }) {
    const data = parseDataJson(block.dataJson);
    const [localData, setLocalData] = useState(parseDataJson(block.dataJson));
    const badge = TYPE_BADGE[data.type] ?? { label: "?", color: "bg-gray-100 text-gray-500 border-gray-200" };

    const [promoting, setPromoting] = useState(false);
    const [rloTitle, setRloTitle] = useState("");
    const { promote } = useContentObjects();

    async function handlePromote() {
        if (!rloTitle.trim()) return;
        await promote(block.id, rloTitle.trim());
        setPromoting(false);
        setRloTitle("");
    }

    function handleDataChange(newData) {
        setLocalData(newData);
        onUpdate(block.id, {
            orderIndex: block.orderIndex,
            dataJson: serializeDataJson(newData),
        });
    }

    return (
        <div className={`rounded-xl border bg-white shadow-sm transition-shadow ${
            isDragging
                ? "opacity-50 shadow-xl ring-2 ring-violet-400"
                : "border-gray-200 hover:border-gray-300 hover:shadow-md"
        }`}>
            {/* Header */}
            <div className="flex items-center gap-2 rounded-t-xl border-b border-gray-100 bg-gray-50/70 px-3 py-2">
                <span className="cursor-grab text-gray-300 hover:text-gray-500">
                    <GripVertical className="h-4 w-4" />
                </span>

                <span className="text-xs font-semibold text-gray-400">Q{index + 1}</span>

                <span className={`rounded-md border px-2 py-0.5 text-xs font-medium ${badge.color}`}>
                    {badge.label}
                </span>

                {data.weight && data.weight !== 1 && (
                    <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                        ×{data.weight} weight
                    </span>
                )}

                <div className="flex-1" />

                {!block.contentObjectId && (
                    promoting ? (
                        <div className="flex items-center gap-1">
                            <input
                                autoFocus
                                type="text"
                                value={rloTitle}
                                onChange={(e) => setRloTitle(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handlePromote()}
                                placeholder="RLO title…"
                                className="rounded border border-gray-200 px-2 py-0.5 text-xs outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-100"
                            />
                            <button
                                onClick={handlePromote}
                                className="rounded px-2 py-0.5 text-xs bg-violet-600 text-white hover:bg-violet-700"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => { setPromoting(false); setRloTitle(""); }}
                                className="rounded px-2 py-0.5 text-xs text-gray-400 hover:text-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setPromoting(true)}
                            title="Save as reusable content"
                            className="rounded p-1 text-gray-400 hover:bg-violet-50 hover:text-violet-600"
                        >
                            <BookmarkPlus className="h-4 w-4" />
                        </button>
                    )
                )}

                {block.contentObjectId && (
                    <span className="rounded-full bg-violet-50 border border-violet-200 px-2 py-0.5 text-xs text-violet-600">
                        RLO
                    </span>
                )}

                <div className="flex items-center gap-0.5">
                    <button
                        onClick={() => onMoveUp(block.id)}
                        disabled={index === 0}
                        className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        <ChevronUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                        onClick={() => onMoveDown(block.id)}
                        disabled={index === totalBlocks - 1}
                        className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                    <button
                        onClick={() => onDelete(block.id)}
                        className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-600"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </button>
                </div>
            </div>

            {/* Question body */}
            <QuestionBlock data={localData} onChange={handleDataChange} />
        </div>
    );
}