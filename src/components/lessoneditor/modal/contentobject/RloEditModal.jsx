import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { BLOCK_TYPE, BLOCK_TYPE_META, parseDataJson, serializeDataJson } from "../../BlockTypes.js";
import { useContentObjects } from "../../../../hooks/contentobject/useContentObjects.js";
import TextBlock from "../../blocktypes/TextBlock.jsx";
import VideoBlock from "../../blocktypes/VideoBlock.jsx";
import ImageBlock from "../../blocktypes/ImageBlock.jsx";
import QuizBlock from "../../blocktypes/QuizBlock.jsx";

const BLOCK_COMPONENTS = {
    [BLOCK_TYPE.TEXT]: TextBlock,
    [BLOCK_TYPE.VIDEO]: VideoBlock,
    [BLOCK_TYPE.IMAGE]: ImageBlock,
    [BLOCK_TYPE.QUIZ]: QuizBlock,
};

export default function RloEditModal({ rlo, onSaved, onClose }) {
    const [localData, setLocalData] = useState(() => parseDataJson(rlo.dataJson));
    const [saving, setSaving] = useState(false);
    const { saveDraft, publish } = useContentObjects();

    const meta = BLOCK_TYPE_META[rlo.blockTypeId];
    const BlockComponent = BLOCK_COMPONENTS[rlo.blockTypeId];

    async function handleSave() {
        setSaving(true);
        const draft = await saveDraft(rlo.id, {
            dataJson: serializeDataJson(localData)
        });
        setSaving(false);
        if (draft) onSaved(draft);
    }

    async function handlePublish() {
        const published = await publish(rlo.id);
        onSaved(published);  // now triggers the version-list refresh
        onClose();
    }

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl flex flex-col overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                    <div>
                        <p className="text-sm font-semibold text-gray-800">Edit Reusable Content</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                            <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${meta.color}`}>{meta.label}</span>
                            <span className="ml-1.5">{rlo.title}</span>
                            <span className="ml-1.5 text-gray-300">·</span>
                            <span className="ml-1.5">currently v{rlo.version} → will save as v{rlo.version + 1}</span>
                        </p>
                    </div>
                    <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Block editor */}
                <div className="flex-1 overflow-y-auto max-h-96 border rounded-xl mx-4 my-4 bg-white">
                    {BlockComponent ? (
                        <BlockComponent
                            data={localData}
                            onChange={setLocalData}
                            readOnly={false}
                        />
                    ) : (
                        <p className="text-xs text-gray-400 px-4 py-6 text-center">
                            This content type cannot be edited directly.
                        </p>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3">
                    <p className="text-xs text-gray-400">
                        Saving creates a new version — existing links are unaffected
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onClose}
                            className="rounded-lg px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={onClose}
                                className="rounded-lg px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-100 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-4 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition"
                            >
                                {saving && <Loader2 className="h-3 w-3 animate-spin" />}
                                {saving ? "Saving…" : "Save draft"}
                            </button>
                            <button
                                onClick={handlePublish}
                                disabled={saving}
                                className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition"
                            >
                                Publish new version
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}