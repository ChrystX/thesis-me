import {formatDate, getImageUrl} from "../../utils/blog/blogUtils.js";

const MobileBlogCard = ({ blog, onClick }) => {
    const imageUrl = getImageUrl(blog.thumbnailUrl);

    return (
        <article
            onClick={() => onClick?.(blog)}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
        >
            {imageUrl ? (
                <div className="aspect-video w-full overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={blog.title || 'Blog post'}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                </div>
            ) : (
                <div className="aspect-video w-full flex items-center justify-center bg-gradient-to-br from-[#E91E63]/10 to-[#E91E63]/20">
                    <div className="text-3xl font-bold text-[#E91E63]/60">
                        {blog.title?.charAt(0) || 'B'}
                    </div>
                </div>
            )}

            <div className="p-5">
                <h3 className="font-bold text-gray-900 text-lg leading-tight mb-3 line-clamp-2">
                    {blog.title}
                </h3>
                {blog.summary && blog.summary !== 'string' && (
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {blog.summary}
                    </p>
                )}
                <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-3">
                        <span>{blog.publishedAt ? formatDate(blog.publishedAt) : 'Recent'}</span>
                        {blog.readTime && <><span>•</span><span>{blog.readTime}</span></>}
                        {blog.author  && <><span>•</span><span>{blog.author}</span></>}
                    </div>
                    <div className="inline-flex items-center gap-1 text-[#E91E63] font-medium">
                        <span>Read</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default MobileBlogCard;