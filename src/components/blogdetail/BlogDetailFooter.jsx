const BlogDetailFooter = ({ onBack, onHome }) => (
    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <button
            onClick={onBack}
            className="px-8 py-3 bg-[#e91e63] text-white rounded-lg font-medium hover:bg-[#d01758] shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
        >
            View All Blog Posts
        </button>
        <button
            onClick={onHome}
            className="px-8 py-3 border-2 border-[#e91e63] text-[#e91e63] rounded-lg font-medium hover:bg-[#e91e63] hover:text-white transition-all transform hover:-translate-y-0.5"
        >
            Back to Homepage
        </button>
    </div>
);

export default BlogDetailFooter;