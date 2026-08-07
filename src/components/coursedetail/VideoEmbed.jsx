import { Play } from 'lucide-react';
import { getVideoEmbedUrl } from './utils/courseUtils.js';

const VideoEmbed = ({ url, title }) => {
    const video = getVideoEmbedUrl(url);

    if (!video) return null;

    if (video.type === 'external') {
        return (
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <Play className="w-4 h-4" />
                <span>Video content available</span>
                <a
                    href={video.embedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline ml-2"
                >
                    Watch Video
                </a>
            </div>
        );
    }

    return (
        <div className="aspect-video w-full">
            <iframe
                src={video.embedUrl}
                title={`${title} - Video`}
                className="w-full h-full rounded-lg min-h-[250px] sm:min-h-[300px] md:min-h-0"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
};

export default VideoEmbed;