import { useEffect, useState } from "react";

const NAVBAR_BASE = 80;

const CoursePageLayout = ({ loading, error, refetch, children }) => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navbarHeight = NAVBAR_BASE + Math.max(0, 48 - scrollY / 2);

    if (loading) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <div className="w-8 h-8 border-2 border-[#e91e63] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Loading courses...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <p className="text-red-600 mb-4">Error loading courses: {error}</p>
                <button onClick={refetch} className="px-4 py-2 bg-[#e91e63] text-white rounded-lg hover:bg-[#d01758] transition-colors">
                    Try Again
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div
                className="w-full transition-all duration-300 ease-in-out"
                style={{ height: window.innerWidth >= 768 ? `${navbarHeight}px` : `${NAVBAR_BASE}px` }}
            />
            {children}
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default CoursePageLayout;