import { ExternalLink, BadgeCheck } from "lucide-react";

export default function ExternalLinkBlock({ data }) {
    const { title, description, url, creator, license } = data;

    return (
        <div className="flex items-start gap-3 px-4 py-3.5 mx-4 mb-4 rounded-xl border border-amber-200 bg-amber-50/40">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-amber-100">
                <ExternalLink className="h-4.5 w-4.5 text-amber-600" />
            </div>

            <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-800 truncate">{title}</p>
                {description && (
                    <p className="mt-1 text-xs text-gray-500 line-clamp-2">{description}</p>
                )}
                <div className="mt-2 flex flex-wrap items-center gap-2">
                    {license && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-gray-500 border border-gray-200">
                            <BadgeCheck className="h-3 w-3" />
                            {license}
                        </span>
                    )}
                    {creator && (
                        <span className="text-[11px] text-gray-400">{creator}</span>
                    )}
                </div>
            </div>

            <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-1 rounded-lg border border-amber-300 bg-white px-3 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-100 transition"
            >
            Visit <ExternalLink className="h-3 w-3" />
        </a>
</div>
);
}