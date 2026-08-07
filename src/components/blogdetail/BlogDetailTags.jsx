import { Tag } from 'lucide-react';
import {parseTags} from "../../utils/blog/blogUtils.js";

const BlogDetailTags = ({ tagsString }) => {
    const tags = parseTags(tagsString);
    if (tags.length === 0) return null;

    return (
        <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-[#e91e63]" />
                <span className="text-sm font-medium text-gray-700">Tags</span>
            </div>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-[#e91e63] hover:text-white transition-colors cursor-pointer"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default BlogDetailTags;