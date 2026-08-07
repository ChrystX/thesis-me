const BlogLoadingSpinner = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
            <div className="w-8 h-8 border-2 border-[#e91e63] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading stories...</p>
        </div>
    </div>
);

export default BlogLoadingSpinner;