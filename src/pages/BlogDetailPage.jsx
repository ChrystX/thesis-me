import { useParams, useNavigate } from 'react-router-dom';
import BlogDetailLoading from "../components/blogdetail/BlogDetailLoading.jsx";
import BlogDetailError from "../components/blogdetail/BlogDetailError.jsx";
import BlogDetailNav from "../components/blogdetail/BlogDetailNav.jsx";
import BlogArticleSection from "../components/blogdetail/section/BlogArticleSection.jsx";
import {useBlogDetail} from "../hooks/blog/useBlogDetail.js";
import {useBlogScroll} from "../hooks/blog/useBlogScroll.js";
import {useBlogShare} from "../hooks/blog/useBlogShare.js";
import BlogDetailFooter from "../components/blogdetail/BlogDetailFooter.jsx";

const BlogDetailPage = () => {
    const { blogId } = useParams();
    const navigate = useNavigate();

    const { blog, blogDetail, loading, error } = useBlogDetail(blogId);
    const { totalNavbarHeight } = useBlogScroll();
    const { handleShare, shareSuccess } = useBlogShare(blog, blogDetail);

    const handleBack = () => navigate('/blog');
    const handleHome = () => navigate('/');

    if (loading) return <BlogDetailLoading navbarHeight={totalNavbarHeight} />;
    if (error)   return <BlogDetailError navbarHeight={totalNavbarHeight} message={error} onBack={handleBack} onHome={handleHome} />;
    if (!blog || !blogDetail) return <BlogDetailError navbarHeight={totalNavbarHeight} onBack={handleBack} onHome={handleHome} notFound />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="w-full transition-all duration-300 ease-in-out" style={{ height: `${totalNavbarHeight}px` }} />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <BlogDetailNav onBack={handleBack} onShare={handleShare} shareSuccess={shareSuccess} />
                <BlogArticleSection blog={blog} blogDetail={blogDetail} />
                <BlogDetailFooter onBack={handleBack} onHome={handleHome} />
            </div>
        </div>
    );
};

export default BlogDetailPage;