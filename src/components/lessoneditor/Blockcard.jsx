import { useState } from "react";
import TextBlock from "./blocktypes/TextBlock.jsx";
import VideoBlock from "./blocktypes/VideoBlock.jsx";
import ImageBlock from "./blocktypes/ImageBlock.jsx";
import QuizBlock from "./blocktypes/QuizBlock.jsx";
import { BLOCK_TYPE, BLOCK_TYPE_META } from "./BlockTypes.js";
import { useBlockCard } from "./hooks/useBlockCard.js";
import {useContentObjects} from "../../hooks/contentobject/useContentObjects.js";
import ExternalLinkBlock from "./blocktypes/ExternalLinkBlocks.jsx";
import {
    GripVertical,
    BookmarkPlus,
    ArrowUp,
    ArrowDown,
    Trash2,
    Layers,
} from "lucide-react";
import CompositeBlockCard from "./CompositeBlockCard.jsx";
import RloVersionList from "./modal/contentobject/RloVersionList.jsx";

const BLOCK_COMPONENTS = {
    [BLOCK_TYPE.TEXT]:  TextBlock,
    [BLOCK_TYPE.VIDEO]: VideoBlock,
    [BLOCK_TYPE.IMAGE]: ImageBlock,
    [BLOCK_TYPE.QUIZ]:  QuizBlock,
    [BLOCK_TYPE.EXTERNAL_LINK]: ExternalLinkBlock,
};

const MEDIA_SOURCES = [
    { id: "url",    label: "URL / Imgur link" },
    { id: "upload", label: "Upload → Cloudinary" },
    { id: "imgur",  label: "Upload → Imgur" },
    { id: "gdrive", label: "Google Drive" },
];

const VIDEO_MEDIA_SOURCES = MEDIA_SOURCES.filter((s) => s.id !== "imgur");

export default function BlockCard({ block, totalBlocks, onUpdate, onDelete, onMoveUp, onMoveDown, isDragging = false, selected = false, onToggleSelect }) {

    const meta = BLOCK_TYPE_META[block.blockTypeId];
    const BlockComponent = BLOCK_COMPONENTS[block.blockTypeId];
    const isImage = block.blockTypeId === BLOCK_TYPE.IMAGE;

    const {
        localData, handleDataChange,
        isVideo, mediaSource, setMediaSource,
        gdriveInput, setGdriveInput,
        gdriveError, setGdriveError,
        fileInputRef,
        uploading, uploadError, clearError,
        handleFileSelected,
        handleGDriveResolve,
    } = useBlockCard(block, onUpdate);

    // ── RLO promote ──────────────────────────────────────────────────────────
    const [promoting, setPromoting] = useState(false);
    const [rloTitle, setRloTitle] = useState("");
    const { promote } = useContentObjects();

    async function handlePromote() {
        if (!rloTitle.trim()) return;
        await promote(block.id, rloTitle.trim());
        setPromoting(false);
        setRloTitle("");
    }

    const [showVersions, setShowVersions] = useState(false);

    async function handleVersionSelect(version) {
        await onUpdate(block.id, {
            orderIndex: block.orderIndex,
            dataJson: block.dataJson ?? "{}",
            contentObjectId: version.id,   // switch to selected version row
        });
        setShowVersions(false);
    }

    if (block.isComposite) {
        return (
            <CompositeBlockCard
                block={block}
                totalBlocks={totalBlocks}
                onDelete={onDelete}
                onMoveUp={onMoveUp}
                onMoveDown={onMoveDown}
                isDragging={isDragging}
            />
        );
    }

    return (
        <div
            className={`rounded-xl border bg-white shadow-sm transition-shadow ${
                isDragging
                    ? "opacity-50 shadow-xl ring-2 ring-blue-400"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-md"
            }`}
        >
            {/* ── Header ── */}
            <div className="flex items-center gap-2 rounded-t-xl border-b border-gray-100 bg-gray-50/70 px-3 py-2">
                <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => onToggleSelect?.(block.id)}
                    className="h-3.5 w-3.5 rounded border-gray-300"
                    title="Select for grouping"
                />

                {/* Drag handle */}
                <span
                    className="cursor-grab text-gray-300 hover:text-gray-500"
                    title="Drag to reorder"
                >
                    <GripVertical className="h-4 w-4" />
                </span>

                <span className={`rounded-md border px-2 py-0.5 text-xs font-medium ${meta.color}`}>
                    {meta.label}
                </span>

                <span className="text-xs text-gray-400">#{block.orderIndex + 1}</span>

                <div className="flex-1" />

                {/* ── RLO section ── */}
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
                                className="rounded border border-gray-200 px-2 py-0.5 text-xs outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
                            />
                            <button
                                onClick={handlePromote}
                                className="rounded px-2 py-0.5 text-xs bg-blue-600 text-white hover:bg-blue-700"
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
                            className="rounded p-1 text-gray-400 hover:bg-blue-50 hover:text-blue-600"
                        >
                            <BookmarkPlus className="h-4 w-4" />
                        </button>
                    )
                )}

                {/* ── RLO badge + version switcher trigger ── */}
                {block.contentObjectId && (
                    <div className="relative">
                        <button
                            onClick={() => setShowVersions((v) => !v)}
                            title="Switch version"
                            className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium transition ${
                                showVersions
                                    ? "border-blue-300 bg-blue-100 text-blue-700"
                                    : "border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100"
                            }`}
                        >
                            <Layers className="h-3 w-3" />
                            RLO
                        </button>

                        {/* Inline version list — absolutely positioned below badge */}
                        {showVersions && (
                            <div className="absolute right-0 top-full z-10 mt-1 w-56 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
                                <p className="mb-1.5 px-1 text-[11px] font-medium text-gray-400 uppercase tracking-wide">
                                    Switch version
                                </p>
                                <RloVersionList
                                    rlo={{ id: block.contentObjectId }}
                                    onSelect={handleVersionSelect}
                                />
                            </div>
                        )}
                    </div>
                )}

                {/* ── Move / Delete ── */}
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

            {/* ── Image source picker ── */}
            {(isImage || isVideo) && (
                <div className="border-b border-gray-100 bg-gray-50/40 px-4 py-2">
                    <div className="flex flex-wrap gap-1">
                        {(isVideo ? VIDEO_MEDIA_SOURCES : MEDIA_SOURCES).map((src) => (
                            <button
                                key={src.id}
                                onClick={() => { setMediaSource(src.id); setGdriveError(null); clearError(); }}
                                className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                                    mediaSource === src.id
                                        ? "bg-blue-100 text-blue-700"
                                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                }`}
                            >
                                {src.id === "upload" && isVideo ? "Upload video → Cloudinary" : src.label}
                            </button>
                        ))}
                    </div>

                    <div className="mt-2">
                        {(mediaSource === "upload" || mediaSource === "imgur") && (
                            <div>
                                <input ref={fileInputRef} type="file" accept={isVideo ? "video/*" : "image/*"} onChange={handleFileSelected} className="hidden" />
                                <button
                                    disabled={uploading}
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 py-3 text-sm text-gray-500 transition hover:border-blue-400 hover:text-blue-600 disabled:cursor-wait disabled:opacity-60"
                                >
                                    {uploading ? "Uploading…" : "Click to choose a file"}
                                </button>
                                {uploadError && <p className="mt-1 rounded bg-red-50 px-2 py-1 text-xs text-red-600">{uploadError}</p>}
                            </div>
                        )}

                        {mediaSource === "gdrive" && (
                            <div className="flex flex-col gap-1.5">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={gdriveInput}
                                        onChange={(e) => setGdriveInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleGDriveResolve()}
                                        placeholder="Paste Google Drive sharing link…"
                                        className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                    />
                                    <button onClick={handleGDriveResolve} className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700">
                                        Use
                                    </button>
                                </div>
                                {gdriveError && <p className="rounded bg-red-50 px-2 py-1 text-xs text-red-600">{gdriveError}</p>}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ── Block body ── */}
            <BlockComponent data={localData} onChange={handleDataChange} />
        </div>
    );
}