import { useState } from "react";
import RloLocalTab from "./RloLocalTab.jsx";
import RloExternalTab from "./RloExternalTab.jsx";
import {BLOCK_TYPE, BLOCK_TYPE_META} from "../../BlockTypes.js";
import { X } from "lucide-react";

const TABS = [
    { id: "local", label: "Local Library" },
    { id: "external", label: "External Sources" },
];

export default function RloSearchModal({ blockTypeId, onSelect, onClose }) {
    const isAnyType = blockTypeId === "any";
    const isGroupType = blockTypeId === BLOCK_TYPE.GROUP;
    const [activeTab, setActiveTab] = useState(isAnyType ? "external" : "local");
    const meta = BLOCK_TYPE_META[blockTypeId];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl flex flex-col overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                    <div>
                        <p className="text-sm font-semibold text-gray-800">Search Reusable Content</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                            {isAnyType ? (
                                "Searching across all content types"
                            ) : isGroupType ? (
                                "Showing grouped content (multiple items bundled together)"
                            ) : (
                                <>Showing <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${meta.color}`}>{meta.label}</span> blocks only</>
                            )}
                        </p>
                    </div>
                    <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Tabs */}
                {!isAnyType && (
                <div className="flex border-b border-gray-100">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 py-2.5 text-xs font-medium transition border-b-2 ${
                                activeTab === tab.id
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-400 hover:text-gray-600"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                )}

                {/* Tab content */}
                {activeTab === "local" && !isAnyType
                    ? <RloLocalTab blockTypeId={blockTypeId} onSelect={onSelect} />
                    : <RloExternalTab blockTypeId={blockTypeId} onSelect={onSelect} />
                }

                {/* Footer */}
                <div className="border-t border-gray-100 px-5 py-3">
                    <button onClick={onClose} className="text-xs text-gray-400 hover:text-gray-600">
                        Cancel — create inline instead
                    </button>
                </div>
            </div>
        </div>
    );
}