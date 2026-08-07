import { useState } from 'react';
import CategoryTabs from './CategoryTabs';
import CategoryInfo from './CategoryInfo';
import CourseListMobile from './CourseListMobile';
import CourseCarousel from './CourseCarousel';
import useIsMobile from "../../hooks/useIsMobile.js";
import {categories} from "../../data/categories.js";

export default function CategoryCourseSection({ courses = [] }) {
    const [selected, setSelected] = useState(categories[0]);
    const isMobile = useIsMobile();

    const filteredCourses = courses.filter(
        c => c.categoryId === selected.id
    );

    return (
        <section className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-center text-2xl font-semibold mb-6">
                Training Categories
            </h1>

            <CategoryTabs
                categories={categories}
                selected={selected}
                onSelect={setSelected}
            />

            <div className="mt-8 flex flex-col lg:flex-row gap-8 border rounded-lg p-6 bg-white">
                <CategoryInfo
                    category={selected}
                    count={filteredCourses.length}
                />

                <div className="flex-1 min-w-0">
                    {isMobile ? (
                        <CourseListMobile courses={filteredCourses} />
                    ) : (
                        <CourseCarousel courses={filteredCourses} />
                    )}
                </div>
            </div>
        </section>
    );
}
