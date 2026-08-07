import { Calendar, ArrowRight } from 'lucide-react';
import { formatDate } from "../../../utils/blog/blogUtils.js";

const estimateReadTime = (blog) =>
    Math.max(1, Math.ceil((blog.content?.length || blog.summary?.length || 500) / 200));

const CarouselCardOverlay = ({ blog }) => (
    <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5">
        {/* Top: date + read time */}
        <div className="flex items-center gap-2 text-white/80 text-xs sm:text-sm">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="font-medium">{formatDate(blog.publishedAt || blog.createdAt)}</span>
            <span className="text-white/60">•</span>
            <span className="text-white/60 text-xs">{estimateReadTime(blog)} min read</span>
        </div>

        {/* Bottom: title + hover reveal */}
        <div className="relative">
            <h3 className="text-white text-base sm:text-lg font-bold line-clamp-2 leading-tight drop-shadow-sm transform transition-transform duration-300 ease-out group-hover:-translate-y-16 sm:group-hover:-translate-y-20">
                {blog.title}
            </h3>

            {/* Hover-reveal: summary + action */}
            <div className="absolute bottom-0 left-0 right-0 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out delay-100">
                {blog.summary && blog.summary !== 'string' && (
                    <p className="text-white/90 text-sm line-clamp-2 leading-relaxed mb-3 drop-shadow-sm">
                        {blog.summary}
                    </p>
                )}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-white font-semibold text-sm group-hover:gap-3 transition-all">
                        <span>Read Article</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                    {blog.category && (
                        <div className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                            {blog.category}
                        </div>
                    )}
                </div>
            </div>

            {/* Static arrow (hidden on hover) */}
            <div className="absolute -bottom-2 right-0 group-hover:opacity-0 group-hover:translate-y-2 transition-all duration-300 ease-out">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300">
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
            </div>
        </div>
    </div>
);

export default CarouselCardOverlay;