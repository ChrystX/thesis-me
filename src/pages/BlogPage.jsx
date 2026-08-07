import { useState, useEffect } from "react";
import { useBlogData } from "../hooks/blog/useBlogData.js";
import BlogHeroSection from "../components/blog/BlogHeroSection.jsx";
import BlogErrorBanner from "../components/blog/BlogErrorBanner.jsx";
import RecentPostsCarousel from "../components/blog/Carousel/RecentPostsCarousel.jsx";
import BlogAllStories from "../components/blog/BlogAllStories.jsx";
import BlogLoadingSpinner from "../components/blog/BlogLeadingSpinner.jsx";

const BLOGS_PER_PAGE = 12;

const BlogPage = () => {
    const { blogs, loading, error, hasData } = useBlogData();
    const [currentPage, setCurrentPage] = useState(1);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const totalPages = Math.ceil(blogs.length / BLOGS_PER_PAGE);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const logoHeight = Math.max(0, 48 - scrollY / 2);
    const totalNavbarHeight = logoHeight + 80;

    if (loading) return <BlogLoadingSpinner />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div
                className="w-full transition-all duration-300 ease-in-out"
                style={{ height: window.innerWidth >= 768 ? `${totalNavbarHeight}px` : '80px' }}
            />

            <BlogHeroSection totalCount={blogs.length} />

            <main className="max-w-7xl mx-auto px-6 py-8">
                {error && <BlogErrorBanner message={error} />}

                {hasData && <RecentPostsCarousel blogs={blogs.slice(0, 8)} />}

                <BlogAllStories
                    blogs={blogs}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </main>

            <style jsx>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideInUp {
                    from { opacity: 0; transform: translateY(60px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
                .animate-slideInUp { animation: slideInUp 0.8s ease-out forwards; opacity: 0; }
            `}</style>
        </div>
    );
};

export default BlogPage;