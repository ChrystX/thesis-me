import { Calendar, Clock, Eye } from 'lucide-react';
import {formatDateLong, formatReadTime} from "../../utils/blog/blogUtils.js";

const BlogDetailHeader = ({ blog, blogDetail }) => (
    <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {blogDetail.seoTitle || blog.title}
        </h1>

        {blogDetail.seoDescription && (
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {blogDetail.seoDescription}
            </p>
        )}

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-500 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#e91e63]" />
                <span>{formatDateLong(blog.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#e91e63]" />
                <span>{formatReadTime(blogDetail.content)}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-[#e91e63]" />
                <span>{blog.viewCount ?? 0} views</span>
            </div>
        </div>
    </header>
);

export default BlogDetailHeader;