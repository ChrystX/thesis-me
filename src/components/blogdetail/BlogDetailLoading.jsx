const BlogDetailLoading = ({ navbarHeight }) => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-full transition-all duration-300 ease-in-out" style={{ height: `${navbarHeight}px` }} />
        <div className="flex items-center justify-center py-20">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-[#e91e63] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                <p className="text-gray-600 text-lg">Loading blog post...</p>
            </div>
        </div>
    </div>
);

export default BlogDetailLoading;