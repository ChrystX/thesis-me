export default function ImageBlock({ data, onChange, readOnly = false }) {
    const update = (field, value) => onChange({ ...data, [field]: value });

    return (
        <div className="flex flex-col gap-3 px-4 pb-4 pt-3">
            {data.url && (
                <img
                    src={data.url}
                    alt={data.alt_text || ""}
                    className="max-h-64 w-full rounded-xl border border-gray-200 object-cover"
                />
            )}

            <input
                type="text"
                disabled={readOnly}
                value={data.url ?? ""}
                onChange={(e) => update("url", e.target.value)}
                placeholder="Paste image URL…"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 placeholder-gray-400 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
            />

            <input
                type="text"
                disabled={readOnly}
                value={data.alt_text ?? ""}
                onChange={(e) => update("alt_text", e.target.value)}
                placeholder="Alt text for accessibility…"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 placeholder-gray-400 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
            />

            <input
                type="text"
                disabled={readOnly}
                value={data.caption ?? ""}
                onChange={(e) => update("caption", e.target.value)}
                placeholder="Caption (optional)…"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 placeholder-gray-400 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
            />
        </div>
    );
}