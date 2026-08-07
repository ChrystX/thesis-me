import MobileBlogCard from "../blogcard/MobileBlogCard.jsx";
import BlogCard from "../blogcard/BlogCard.jsx";

const RecentPostsGrid = ({ blogs, onBlogClick }) => {
    if (!blogs || blogs.length === 0) return null;

    return (
        <>
            {/* Mobile */}
            <div className="sm:hidden space-y-6 px-2">
                {blogs.slice(0, 4).map((blog, index) => (
                    <MobileBlogCard key={blog.id || index} blog={blog} onClick={onBlogClick} />
                ))}

                {blogs.length > 4 && (
                    <div className="text-center pt-4 pb-2">
                        <button
                            onClick={() => onBlogClick?.({ showAll: true })}
                            className="inline-flex items-center gap-2 bg-[#E91E63] hover:bg-[#C2185B] text-white px-6 py-3 rounded-xl shadow-sm font-medium transition-all duration-300 hover:shadow-md hover:scale-105"
                        >
                            <span>View All {blogs.length} Stories</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            {/* Desktop */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {blogs.map((blog, index) => (
                    <BlogCard key={blog.id || index} blog={blog} index={index} onClick={onBlogClick} />
                ))}
            </div>
        </>
    );
};

export default RecentPostsGrid;