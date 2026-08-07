import { useState, useEffect, useRef } from "react";
import {useExternalContentSearch} from "../../../../hooks/contentobject/useExternalContentSearch.js";
import {AlertCircle, Loader2, Search, Plus } from "lucide-react";

const SOURCES = [
    { id: "youtube", label: "YouTube" },
    { id: "oersi", label: "OER" },
    { id: "wikimedia", label: "Wikimedia" },
];

export default function RloExternalTab({ onSelect }) {
    const [query, setQuery] = useState("");
    const debounceRef = useRef(null);
    const {
        source, setSource,
        results, loading, importing, error,
        search, importResult
    } = useExternalContentSearch();

    useEffect(() => {
        if (!query.trim()) return;
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => search(query), 400);
        return () => clearTimeout(debounceRef.current);
    }, [query, source]);

    async function handleImport(result) {
        const contentObject = await importResult(result);
        if (contentObject) onSelect(contentObject);
    }

    return (
        <>
            {/* Source selector + search */}
            <div className="px-5 py-3 border-b border-gray-100 flex flex-col gap-2">
                {/* Source tabs */}
                <div className="flex gap-1.5">
                    {SOURCES.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => setSource(s.id)}
                            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                                source === s.id
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                            }`}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>

                {/* Search input */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                    <input
                        autoFocus
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={`Search ${SOURCES.find(s => s.id === source)?.label}…`}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
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
                {error && (
                    <div className="flex items-center justify-center gap-2 py-6">
                        <AlertCircle className="h-3.5 w-3.5 text-red-400" />
                        <p className="text-xs text-red-400">{error}</p>
                    </div>
                )}
                {!loading && !error && query && results.length === 0 && (
                    <p className="text-center text-xs text-gray-400 py-6">No results found.</p>
                )}
                {!loading && !query && (
                    <p className="text-center text-xs text-gray-400 py-6">Type to search external sources.</p>
                )}
                {!loading && results.map((result, idx) => (
                    <div
                        key={idx}
                        className="flex items-start gap-3 rounded-xl border border-gray-200 px-4 py-3 mb-2"
                    >
                        {/* Thumbnail */}
                        {result.thumbnailUrl && (
                            <img
                                src={result.thumbnailUrl}
                                alt={result.title}
                                className="h-12 w-20 rounded-lg object-cover flex-shrink-0 bg-gray-100"
                            />
                        )}

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">{result.title}</p>
                            {result.description && (
                                <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{result.description}</p>
                            )}
                            <p className="text-xs text-gray-300 mt-1 capitalize">{result.source} · {result.suggestedBlockTypeName}</p>
                        </div>

                        {/* Import button */}
                        <button
                            onClick={() => handleImport(result)}
                            disabled={importing}
                            className="flex-shrink-0 rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-600 disabled:opacity-50 transition"
                        >
                            {importing
                                ? <Loader2 className="h-3 w-3 animate-spin" />
                                : <Plus className="h-3 w-3" />
                            }
                            {importing ? "Adding..." : "Add"}
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}