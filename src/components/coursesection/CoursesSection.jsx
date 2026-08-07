import { useState } from "react";
import CoursesLoading from "./CourseLoading.jsx";
import CoursesError from "./CoursesError.jsx";
import {useCourses} from "../../hooks/course/useCourses.js";
import CourseCard from "../coursecard/CourseCard.jsx";

const PAGE_SIZE = 6;

const CoursesSection = () => {
    const { courses, loading, error, refetch } = useCourses();
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    const visibleCourses = courses.slice(0, visibleCount);
    const remaining = courses.length - visibleCount;

    const loadMore = () => {
        setVisibleCount((prev) => prev + PAGE_SIZE);
    };

    return (
        <section className="px-4 py-6 sm:py-8 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8">
                    Featured Courses
                </h2>

                {loading && <CoursesLoading />}
                {error && <CoursesError error={error} onRetry={refetch} />}

                {!loading && !error && courses.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-lg border">
                        No courses available.
                    </div>
                )}

                {!loading && !error && courses.length > 0 && (
                    <>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                            {visibleCourses.map(course => (
                                <CourseCard key={course.Id} course={course} />
                            ))}
                        </div>

                        {remaining > 0 && (
                            <div className="text-center mt-8">
                                <button
                                    onClick={loadMore}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md"
                                >
                                    Load More ({remaining} remaining)
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default CoursesSection;
