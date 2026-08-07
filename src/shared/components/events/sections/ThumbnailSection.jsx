import { Section, Field } from "../ui/FormPrimitives.jsx";
import { useState } from "react";

export function ThumbnailSection({ thumbnailUrl, onThumbnailUrlChange, previewVideoUrl, onPreviewVideoUrlChange }) {
    const [showThumbnail, setShowThumbnail] = useState(!!thumbnailUrl);
    const [showVideo, setShowVideo] = useState(!!previewVideoUrl);

    return (
        <Section label="Media">
            <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg cursor-pointer">
                    <input
                        type="checkbox"
                        checked={showThumbnail}
                        onChange={(e) => {
                            setShowThumbnail(e.target.checked);
                            if (!e.target.checked) onThumbnailUrlChange("");
                        }}
                        className="w-4 h-4 accent-black"
                    />
                    <span className="text-sm text-gray-800">Event poster / thumbnail</span>
                    <span className="ml-auto text-xs text-gray-400">Image URL</span>
                </label>

                {showThumbnail && (
                    <Field label="Thumbnail URL">
                        <input
                            type="url"
                            value={thumbnailUrl}
                            onChange={(e) => onThumbnailUrlChange(e.target.value)}
                            placeholder="https://example.com/poster.jpg"
                        />
                    </Field>
                )}

                <label className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg cursor-pointer">
                    <input
                        type="checkbox"
                        checked={showVideo}
                        onChange={(e) => {
                            setShowVideo(e.target.checked);
                            if (!e.target.checked) onPreviewVideoUrlChange("");
                        }}
                        className="w-4 h-4 accent-black"
                    />
                    <span className="text-sm text-gray-800">Preview video</span>
                    <span className="ml-auto text-xs text-gray-400">Video URL</span>
                </label>

                {showVideo && (
                    <Field label="Preview Video URL">
                        <input
                            type="url"
                            value={previewVideoUrl}
                            onChange={(e) => onPreviewVideoUrlChange(e.target.value)}
                            placeholder="https://youtube.com/watch?v=..."
                        />
                    </Field>
                )}
            </div>
        </Section>
    );
}