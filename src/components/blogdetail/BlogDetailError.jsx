import { BookOpen } from 'lucide-react';

const BlogDetailError = ({ navbarHeight, message, onBack, onHome, notFound = false }) => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-full transition-all duration-300 ease-in-out" style={{ height: `${navbarHeight}px` }} />
        <div className="flex items-center justify-center py-20">
            <div className="text-center max-w-md mx-auto px-4">
                <div className={`w-16 h-16 ${notFound ? 'bg-gray-200' : 'bg-red-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <BookOpen className={`w-8 h-8 ${notFound ? 'text-gray-400' : 'text-red-500'}`} />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {notFound ? 'Blog post not found' : 'Something went wrong'}
                </h2>
                <p className="text-gray-600 mb-6">
                    {notFound
                        ? "The blog post you're looking for doesn't exist or has been moved."
                        : `Error: ${message}`
                    }
                </p>
                <div className="space-y-3">
                    <button
                        onClick={onBack}
                        className="w-full px-6 py-3 bg-[#e91e63] text-white rounded-lg hover:bg-[#d01758] transition-colors font-medium"
                    >
                        {notFound ? 'Browse All Blogs' : 'Back to Blog'}
                    </button>
                    <button
                        onClick={onHome}
                        className="w-full px-6 py-3 border-2 border-[#e91e63] text-[#e91e63] rounded-lg hover:bg-[#e91e63] hover:text-white transition-all font-medium"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default BlogDetailError;