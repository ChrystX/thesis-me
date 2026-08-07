import { BookOpen, ChevronDown } from 'lucide-react';
import CourseCard from "../coursecard/CourseCard.jsx";

const CourseCategorySection = ({ category, courses, visibleCount, onLoadMore, index }) => {
    const visibleCourses = courses.slice(0, visibleCount);
    const hasMore = courses.length > visibleCount;

    return (
        <section
            className="space-y-8"
            style={{ animationDelay: `${index * 200}ms`, animation: 'fadeInUp 0.8s ease-out forwards' }}
        >
            <div className="text-center">
                <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#e91e63] to-[#f06292] rounded-full flex items-center justify-center">
                        <BookOpen size={20} className="text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">{category.name}</h2>
                </div>
                <p className="text-gray-600 text-lg mb-2 max-w-2xl mx-auto">{category.description}</p>
                <p className="text-sm text-[#e91e63] font-medium mb-6">{courses.length} courses available</p>
                <div className="relative mx-auto w-32 h-1 bg-gradient-to-r from-transparent via-[#e91e63] to-transparent rounded-full mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#e91e63] to-[#f06292] rounded-full animate-pulse" />
                </div>
            </div>

            {visibleCourses.length > 0 ? (
                <>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                        {visibleCourses.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                    {hasMore && (
                        <div className="flex justify-center pt-8">
                            <button
                                onClick={onLoadMore}
                                className="group relative overflow-hidden flex items-center gap-2 md:gap-3 px-4 py-2.5 md:px-8 md:py-4 bg-white border-2 border-[#e91e63] text-[#e91e63] rounded-full hover:text-white transition-all duration-500 font-medium text-sm md:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                <div className="absolute inset-0 bg-[#e91e63] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                                <span className="relative z-10">Load More</span>
                                <ChevronDown size={16} className="relative z-10 group-hover:animate-bounce md:size-[18px]" />
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 shadow-sm">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen size={24} className="text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-lg">No courses available in this category</p>
                    <p className="text-gray-400 text-sm mt-2">Check back soon for new content!</p>
                </div>
            )}
        </section>
    );
};

export default CourseCategorySection;