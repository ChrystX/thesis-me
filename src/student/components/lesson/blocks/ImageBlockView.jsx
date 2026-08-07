export default function ImageBlockView({ data }) {
    if (!data?.url) return null;

    return (
        <figure className="my-2">
            <img
                src={data.url}
                alt={data.alt_text || ""}
                className="w-full rounded-2xl border border-gray-100 shadow-sm object-cover max-h-96"
            />
            {data.caption && (
                <figcaption className="text-xs text-gray-400 text-center mt-2">
                    {data.caption}
                </figcaption>
            )}
        </figure>
    );
}