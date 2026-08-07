function getEmbedUrl(url) {
    if (!url) return null;
    try {
        const u = new URL(url);
        if (u.hostname.includes("youtube.com")) {
            const v = u.searchParams.get("v");
            if (v) return `https://www.youtube.com/embed/${v}`;
        }
        if (u.hostname === "youtu.be") {
            return `https://www.youtube.com/embed${u.pathname}`;
        }
    } catch {
        return null;
    }
    return null;
}

export default function VideoBlockView({ data }) {
    const embedUrl = getEmbedUrl(data?.url);

    if (!embedUrl) {
        return (
            <div className="flex flex-col items-center justify-center h-40 bg-gray-50 rounded-2xl border border-dashed border-gray-200 gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-gray-300">
                    <path d="M8 5v14l11-7z" />
                </svg>
                <p className="text-xs text-gray-400">No video URL provided</p>
            </div>
        );
    }

    return (
        <figure className="my-2">
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                    <iframe
                        src={embedUrl}
                        title={data.caption || "Video"}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                    />
                </div>
            </div>
            {data.caption && (
                <figcaption className="text-xs text-gray-400 text-center mt-2">
                    {data.caption}
                </figcaption>
            )}
        </figure>
    );
}