import { useState, useEffect } from "react";
import {useContentObjects} from "../../../../hooks/contentobject/useContentObjects.js";
import {Loader2, Search, ChevronDown, ChevronUp } from "lucide-react";
import RloVersionList from "./RloVersionList.jsx";
import RloEditModal from "./RloEditModal.jsx";

export default function RloLocalTab({ blockTypeId, onSelect }) {
    const [query, setQuery] = useState("");
    const [expandedId, setExpandedId] = useState(null);
    const [editingRlo, setEditingRlo] = useState(null);
    const { results, loading, search } = useContentObjects();

    useEffect(() => {
        search(blockTypeId, "");
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => search(blockTypeId, query), 400);
        return () => clearTimeout(timeout);
    }, [query]);

    function toggleVersions(rloId) {
        setExpandedId(prev => prev === rloId ? null : rloId);
    }

    function handleVersionCreated(newVersion) {
        // refresh search results so new version appears
        search(blockTypeId, query);
        setEditingRlo(null);
    }

    return (
        <>
            {/* Search input */}
            <div className="px-5 py-3 border-b border-gray-100">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                    <input
                        autoFocus
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by title…"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-8 pr-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />
                </div>
            </div>

            {/* Results */}
            <div className="flex-1 overflow-y-auto px-5 py-3 max-h-80">
                {loading && (
                    <div className="flex items-center justify-center gap-2 py-6">
                        <Loader2 className="h-3.5 w-3.5 animate-spin text-gray-400" />
                        <p className="text-xs text-gray-400">Searching…</p>
                    </div>
                )}
                {!loading && results.length === 0 && (
                    <p className="text-center text-xs text-gray-400 py-6">No reusable content found.</p>
                )}
                {!loading && results.map((rlo) => (
                    <div
                        key={rlo.id}
                        className="rounded-xl border border-gray-200 px-4 py-3 mb-2"
                    >
                        {/* Main row */}
                        <div className="flex items-center gap-2">
                            {/* Select latest */}
                            <button
                                onClick={() => onSelect(rlo)}
                                className="flex-1 text-left hover:text-blue-600 transition"
                            >
                                <p className="text-sm font-medium text-gray-800">{rlo.title}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{rlo.blockTypeName}</p>
                            </button>

                            <button
                                onClick={() => toggleVersions(rlo.id)}
                                className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium transition
                                            bg-violet-50 text-violet-600 hover:bg-violet-100`}
                            >
                                v{rlo.version}
                                {expandedId === rlo.id
                                    ? <ChevronUp className="h-3 w-3" />
                                    : <ChevronDown className="h-3 w-3" />
                                }
                            </button>
                        </div>

                        {/* Inline version list */}
                        {expandedId === rlo.id && (
                            <RloVersionList
                                rlo={rlo}
                                onSelect={onSelect}
                                onEditVersion={setEditingRlo}
                            />
                        )}
                    </div>
                ))}
            </div>

            {editingRlo && (
                <RloEditModal
                    rlo={editingRlo}
                    onSaved={handleVersionCreated}
                    onClose={() => setEditingRlo(null)}
                />
            )}
        </>
    );
}