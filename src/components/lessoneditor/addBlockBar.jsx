import { useState } from "react";
import {BLOCK_TYPE, BLOCK_TYPE_META} from "./BlockTypes.js";
import RloSearchModal from "./modal/contentobject/RloSearchModal.jsx";
import { Search } from "lucide-react";

export default function AddBlockBar({ onAdd, onAddRlo, disabled = false }) {
    const [searchingBlockTypeId, setSearchingBlockTypeId] = useState(null);

    function handleSelect(rlo) {
        onAddRlo(searchingBlockTypeId, rlo);
        setSearchingBlockTypeId(null);
    }

    const creatableTypes = Object.values(BLOCK_TYPE_META).filter(
        (meta) => !meta.notManuallyCreatable
    );


    return (
        <>
            <div className="mt-4 flex flex-col items-center gap-3 py-4">
                <p className="text-xs font-medium uppercase tracking-widest text-gray-400">
                    Add a block
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                    {creatableTypes.map((meta) => (
                        <div key={meta.id} className="flex rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
                            {/* Create inline — same as before */}
                            <button
                                disabled={disabled}
                                onClick={() => onAdd(meta.id)}
                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <span className={`h-2 w-2 rounded-full ${meta.dotColor}`} />
                                {meta.label}
                            </button>

                            {/* Divider */}
                            <span className="w-px bg-gray-200" />

                            {/* Search RLO */}
                            <button
                                disabled={disabled}
                                onClick={() => setSearchingBlockTypeId(meta.id)}
                                title="Use existing reusable content"
                                className="px-2.5 py-2 text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </button>

                            <button
                                disabled={disabled}
                                onClick={() => setSearchingBlockTypeId("any")}
                                className="flex items-center gap-2 rounded-lg border border-dashed border-amber-300 bg-amber-50/40 px-4 py-2 text-sm text-amber-700 transition hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Search className="h-3.5 w-3.5" />
                                Search external sources
                            </button>
                        </div>
                    ))}

                    <div className="flex rounded-lg border border-purple-200 bg-purple-50 shadow-sm overflow-hidden">
                        <button
                            disabled={disabled}
                            onClick={() => setSearchingBlockTypeId(BLOCK_TYPE.GROUP)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-purple-700 transition hover:bg-purple-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <span className="h-2 w-2 rounded-full bg-purple-500" />
                            Browse Groups
                        </button>
                    </div>

                </div>
            </div>

            {searchingBlockTypeId && (
                <RloSearchModal
                    blockTypeId={searchingBlockTypeId}
                    onSelect={handleSelect}
                    onClose={() => setSearchingBlockTypeId(null)}
                />
            )}
        </>
    );
}