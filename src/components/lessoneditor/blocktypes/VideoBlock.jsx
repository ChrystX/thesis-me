import {useVideoEmbed} from "../../../hooks/util/useVideoEmbed.js";


const PLATFORM_COLORS = {
    YouTube:           "#FF0000",
    Vimeo:             "#1AB7EA",
    "Google Drive":    "#4285F4",
    Dailymotion:       "#0066DC",
    Twitch:            "#9146FF",
    Loom:              "#625DF5",
    Streamable:        "#3AA5F3",
    Wistia:            "#54BBFF",
    Facebook:          "#1877F2",
    TED:               "#E62B1E",
    Bilibili:          "#00AEEC",
    Odysee:            "#EF1970",
    Rumble:            "#85C742",
    Vidyard:           "#F5A623",
    "Cloudflare Stream": "#F6821F",
    "Video File":      "#6B7280",
};

function PlatformBadge({ platform }) {
    const color = PLATFORM_COLORS[platform] ?? "#6B7280";
    return (
        <span
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium text-white"
            style={{ backgroundColor: color }}
        >
            {platform}
        </span>
    );
}

function PlayIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-gray-300">
            <path d="M8 5v14l11-7z" />
        </svg>
    );
}

export default function VideoBlock({ data, onChange, readOnly = false }) {
    const update = (field, value) => onChange({ ...data, [field]: value });
    const resolved = useVideoEmbed(data.url);

    return (
        <div className="flex flex-col gap-3 px-4 pb-4 pt-3">
            {/* URL input */}
            <input
                type="text"
                disabled={readOnly}
                value={data.url ?? ""}
                onChange={(e) => update("url", e.target.value)}
                placeholder="Paste a video URL (YouTube, Vimeo, Drive, Loom, Twitch…)"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
            />

            {/* Preview */}
            {resolved ? (
                <div className="flex flex-col gap-1.5">
                    {/* Platform badge */}
                    <div className="flex items-center gap-2">
                        <PlatformBadge platform={resolved.platform} />
                    </div>

                    <div className="overflow-hidden rounded-xl border border-gray-200">
                        {resolved.type === "video" ? (
                            // Native video element for direct file URLs
                            <video
                                src={resolved.embedUrl}
                                controls
                                className="h-52 w-full bg-black"
                            />
                        ) : (
                            <iframe
                                key={resolved.embedUrl}     // re-mount on URL change
                                src={resolved.embedUrl}
                                title={`${resolved.platform} video preview`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                allowFullScreen
                                sandbox="allow-scripts allow-same-origin allow-presentation allow-popups allow-forms"
                                className="h-52 w-full"
                            />
                        )}
                    </div>
                </div>
            ) : (
                // Empty state
                <div className="flex h-28 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-50">
                    <PlayIcon />
                    <p className="text-xs text-gray-400">Paste a URL above to preview</p>
                </div>
            )}

            {/* Caption */}
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