import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const CourseDetailLayout = ({ loading, error, children }) => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const logoHeight = Math.max(0, 48 - scrollY / 2);
    const totalNavbarHeight = logoHeight + 80;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <p className="text-gray-300 text-sm animate-pulse">Loading course…</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center gap-3">
                <p className="text-gray-900 font-semibold">Something went wrong</p>
                <p className="text-gray-400 text-sm">{error}</p>
                <button
                    onClick={() => window.history.back()}
                    className="inline-flex items-center gap-1.5 text-sm text-[#e91e63] hover:underline mt-2"
                >
                    <ArrowLeft size={15} />
                    Back to courses
                </button>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 text-gray-900">
            {/* Spacer for fixed navbar */}
            <div style={{ height: `${totalNavbarHeight}px` }} />

            {/* Sticky sub-header */}
            <header
                className="sticky bg-white border-b border-gray-100 z-20"
                style={{ top: `${80}px` }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft size={15} />
                        Back to courses
                    </button>
                </div>
            </header>

            {children}
        </main>
    );
};

export default CourseDetailLayout;