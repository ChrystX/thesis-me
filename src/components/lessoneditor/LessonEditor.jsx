import { useState } from "react";
import { useLessonBlocks } from "../../hooks/lesson/useLessonBlocks.js";
import { contentObjectService } from "../../api/contentObjectService.js";
import { BLOCK_TYPE_META, serializeDataJson } from "./BlockTypes.js";
import BlockList from "./Blocklist.jsx";
import AddBlockBar from "./addBlockBar.jsx";

export default function LessonEditor({ lessonId, lessonTitle = "Untitled Lesson" }) {
    const { blocks, createBlock, updateBlock, deleteBlock, groupBlocks, ungroupBlock, refetch } = useLessonBlocks(lessonId);
    const [selectedIds, setSelectedIds] = useState([]);
    const [adding, setAdding] = useState(false);
    const [showJson, setShowJson] = useState(false);

    // Add a new block
    async function handleAdd(blockTypeId) {
        setAdding(true);
        const meta = BLOCK_TYPE_META[blockTypeId];
        await createBlock({
            blockTypeId,
            orderIndex: blocks.length,             // appended at end
            dataJson: serializeDataJson(meta.defaultData),
        });
        setAdding(false);
    }

    // Update a block's data_json (called by BlockCard after debounce)
    async function handleUpdate(blockId, dto) {
        await updateBlock(blockId, dto);
    }

    async function handleDelete(blockId) {
        if (!window.confirm("Delete this block?")) return;
        await deleteBlock(blockId);
    }

    // Fires a PATCH for every block whose orderIndex changed.
    async function handleReorder(orderedIds) {
        const updates = orderedIds
            .map((id, newIndex) => {
                const block = blocks.find((b) => b.id === id);
                if (!block || block.orderIndex === newIndex) return null;
                return updateBlock(id, { orderIndex: newIndex, dataJson: block.dataJson });
            })
            .filter(Boolean);
        await Promise.all(updates);
    }


    async function handleAddRlo(blockTypeId, rlo) {
        setAdding(true);
        console.log("handleAddRlo payload:", { blockTypeId, rloId: rlo.id, rloBlockTypeId: rlo.blockTypeId });
        await createBlock({
            blockTypeId: Number(rlo.blockTypeId),
            orderIndex: blocks.length,
            dataJson: "{}",
            contentObjectId: rlo.id,
        });
        setAdding(false);
    }

    function toggleSelect(blockId) {
        setSelectedIds((prev) =>
            prev.includes(blockId) ? prev.filter((id) => id !== blockId) : [...prev, blockId]
        );
    }

    async function handleGroupSelected() {
        const title = window.prompt("Name this group:");
        if (!title?.trim()) return;
        await groupBlocks({ title: title.trim(), blockIds: selectedIds });
        setSelectedIds([]);
    }

    async function handleUngroup(blockId) {
        if (!window.confirm("Ungroup this block? It will be split back into its individual blocks.")) return;
        await ungroupBlock(blockId);
    }

    // Edit a single child's content in place, without ungrouping the composite.
    async function handleUpdateChild(contentObjectId, dataJson) {
        await contentObjectService.update(contentObjectId, { dataJson });
        await refetch();
    }

    return (
        <div className="flex h-full flex-col overflow-hidden bg-gray-50">
            <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 shadow-sm">
                <div className="flex items-center gap-3">
                    <h1 className="text-base font-semibold text-gray-900">{lessonTitle}</h1>
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                        {blocks.length} block{blocks.length !== 1 ? "s" : ""}
                    </span>

                    {selectedIds.length >= 2 && (
                        <button
                            onClick={handleGroupSelected}
                            className="rounded-lg border border-purple-300 bg-purple-50 px-3 py-1.5 text-xs font-medium text-purple-700 hover:bg-purple-100"
                        >
                            Group Selected ({selectedIds.length})
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowJson((v) => !v)}
                        className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                            showJson
                                ? "border-blue-300 bg-blue-50 text-blue-700"
                                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                        {showJson ? "Hide JSON" : "View JSON"}
                    </button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Editor column */}
                <main className="flex-1 overflow-y-auto px-6 py-6">
                    <BlockList
                        blocks={blocks}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                        onReorder={handleReorder}
                        onUngroup={handleUngroup}
                        onUpdateChild={handleUpdateChild}
                        selectedIds={selectedIds}
                        onToggleSelect={toggleSelect}
                    />
                    <AddBlockBar onAdd={handleAdd} onAddRlo={handleAddRlo} disabled={adding} />
                </main>

                {/* JSON preview panel */}
                {showJson && (
                    <aside className="w-72 shrink-0 overflow-y-auto border-l border-gray-200 bg-gray-900 p-4">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
                            data_json preview
                        </p>
                        <pre className="whitespace-pre-wrap break-all font-mono text-[11px] leading-relaxed text-green-400">
              {JSON.stringify(
                  blocks
                      .sort((a, b) => a.orderIndex - b.orderIndex)
                      .map((b) => ({
                          id: b.id,
                          block_type_id: b.blockTypeId,
                          order_index: b.orderIndex,
                          data_json: b.dataJson,
                      })),
                  null,
                  2
              )}
            </pre>
                    </aside>
                )}
            </div>
        </div>
    );
}