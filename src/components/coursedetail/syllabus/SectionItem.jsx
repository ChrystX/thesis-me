import { ChevronDown, ChevronUp, Play, Clock } from 'lucide-react';
import { formatDuration } from '../utils/courseUtils';
import VideoEmbed from '../VideoEmbed.jsx';

const SectionItem = ({ section, index, isExpanded, onToggle }) => {
    return (
        <div className="border-b border-gray-200">
            <div
                className="flex items-center justify-between cursor-pointer p-6 hover:bg-gray-50"
                onClick={onToggle}
            >
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                        {index + 1}
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg">{section.title}</h3>

                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                  {formatDuration(section.durationMinutes)}
              </span>

                            {section.videoUrl && (
                                <span className="flex items-center gap-1">
                  <Play className="w-4 h-4" />
                  Video
                </span>
                            )}
                        </div>
                    </div>
                </div>

                {isExpanded
                    ? <ChevronUp className="w-5 h-5 text-gray-400" />
                    : <ChevronDown className="w-5 h-5 text-gray-400" />}
            </div>

            {isExpanded && (
                <div className="px-6 pb-6 ml-14 space-y-4">
                    {section.contentHtml && (
                        <div
                            className="prose max-w-none text-gray-600"
                            dangerouslySetInnerHTML={{ __html: section.contentHtml }}
                        />
                    )}

                    {section.videoUrl && (
                        <div className="bg-gray-50 rounded-lg p-4">
                            <VideoEmbed url={section.videoUrl} title={section.title} />
                        </div>
                    )}

                    {section.thumbnailUrl && (
                        <div className="bg-gray-50 rounded-lg p-4">
                            <img
                                src={section.thumbnailUrl}
                                alt={`${section.title} thumbnail`}
                                className="max-w-full h-auto rounded"
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SectionItem;