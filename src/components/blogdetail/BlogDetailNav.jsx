import { ArrowLeft, Share2 } from 'lucide-react';

const BlogDetailNav = ({ onBack, onShare, shareSuccess }) => (
    <div className="flex items-center justify-between mb-8 bg-white rounded-lg shadow-sm px-4 py-3">
        <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#e91e63] hover:text-[#d01758] font-medium transition-colors group"
        >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Back to Blog</span>
            <span className="sm:hidden">Back</span>
        </button>

        <button
            onClick={onShare}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                shareSuccess
                    ? 'bg-green-100 text-green-700'
                    : 'bg-[#e91e63] text-white hover:bg-[#d01758]'
            }`}
        >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">{shareSuccess ? 'Copied!' : 'Share'}</span>
        </button>
    </div>
);

export default BlogDetailNav;