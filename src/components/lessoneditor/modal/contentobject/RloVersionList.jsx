import {useEffect} from "react";
import {Loader2, Plus} from "lucide-react";
import {useContentVersions} from "../../../../hooks/contentobject/useContentVersions.js";

export default function RloVersionList({ rlo, onSelect, onEditVersion, draft }) {
    const { versions, loading, fetchVersions } = useContentVersions();

    useEffect(() => {
        fetchVersions(rlo.id);
    }, [rlo.id]);

    if (loading) return (
        <div className="flex items-center gap-2 px-3 py-2">
            <Loader2 className="h-3 w-3 animate-spin text-gray-400" />
            <p className="text-xs text-gray-400">Loading versions…</p>
        </div>
    );

    return (
        <div className="mt-2 flex flex-col gap-1">
            {versions.map((v) => (
                <button
                    key={v.id}
                    onClick={() => onSelect(v)}
                    className={`w-full text-left rounded-lg px-3 py-2 text-xs transition flex items-center justify-between ${
                        v.id === rlo.id
                            ? "bg-blue-50 border border-blue-200 text-blue-700"
                            : "bg-gray-50 border border-gray-200 text-gray-600 hover:border-blue-200 hover:bg-blue-50"
                    }`}
                >
                    <span className="font-medium">v{v.version}</span>
                    <span className="text-gray-400">
                        {new Date(v.createdAt).toLocaleDateString()}
                    </span>
                </button>
            ))}

            {draft && (
                <div className="rounded-lg border border-dashed border-amber-300 px-3 py-2 text-xs text-amber-600">
                    Unpublished draft — last edited {new Date(draft.updatedAt).toLocaleDateString()}
                </div>
            )}


            {onEditVersion && (
                <button
                    onClick={() => onEditVersion(draft ?? versions[versions.length - 1])}
                    className="mt-1 flex items-center gap-1 rounded-lg border border-dashed border-violet-300 px-3 py-2 text-xs text-violet-600 hover:bg-violet-50 transition w-full"
                >
                    <Plus className="h-3 w-3" />
                    Edit draft
                </button>
            )}
        </div>
    );
}