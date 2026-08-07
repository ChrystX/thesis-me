import { useState, useEffect } from "react";
import { BookOpen } from "lucide-react";
import CourseHeroSection from "./CourseHeroSection.jsx";
import CourseCategorySection from "./CourseCategorySection.jsx";

const INITIAL_VISIBLE = (width) => (width < 1024 ? 2 : 3);
const LOAD_INCREMENT = (width) => (width < 1024 ? 2 : 3);

const CoursePageContent = ({ courses = [], categories = [] }) => {
    const [visibleCourses, setVisibleCourses] = useState({});

    useEffect(() => {
        if (categories.length > 0) {
            const init = {};
            categories.forEach(cat => { init[cat.id] = INITIAL_VISIBLE(window.innerWidth); });
            setVisibleCourses(init);
        }

        const handleResize = () => {
            const init = {};
            categories.forEach(cat => { init[cat.id] = INITIAL_VISIBLE(window.innerWidth); });
            setVisibleCourses(init);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [categories]);

    const handleLoadMore = (categoryId) => {
        setVisibleCourses(prev => ({
            ...prev,
            [categoryId]: (prev[categoryId] ?? INITIAL_VISIBLE(window.innerWidth)) + LOAD_INCREMENT(window.innerWidth),
        }));
    };

    const getCoursesByCategory = (categoryId) => courses.filter(c => c.categoryId === categoryId);

    return (
        <>
            <CourseHeroSection courseCount={courses.length} />

            <div className="max-w-7xl mx-auto px-6 py-16">
                {categories.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                            <BookOpen size={32} className="text-gray-400" />
                        </div>
                        <p className="text-gray-600 text-lg">No categories available</p>
                    </div>
                ) : (
                    <div className="space-y-16">
                        {categories.map((category, index) => (
                            <CourseCategorySection
                                key={category.id}
                                category={category}
                                courses={getCoursesByCategory(category.id)}
                                visibleCount={visibleCourses[category.id] ?? INITIAL_VISIBLE(window.innerWidth)}
                                onLoadMore={() => handleLoadMore(category.id)}
                                index={index}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default CoursePageContent;