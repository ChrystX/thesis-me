import HeroSection from "../sections/HeroSection.jsx";
import Affiliates from "../components/affiliates/Affiliates.jsx";
import CategoryCourseSection from "../components/categorycoursesection/CategoryCourseSection.jsx";
import {useCourses} from "../hooks/course/useCourses.js";
import SweeperSection from "../components/sweepersection/SweeperSection.jsx";
import TestimonialSection from "../components/testimonysection/TestimonialSection.jsx";
import SignUpSection from "../components/application/SignUpSection.jsx";

const HomePage = () => {
    const { courses, loading, error } = useCourses({ activeOnly: true });

    if (error) {
        return (
            <div className="w-full text-center py-10 text-red-500">
                {error}
            </div>
        )
    }

    return (
        <div className="w-full">
            <HeroSection />
            <Affiliates />
            <CategoryCourseSection courses={courses}/>
            <SweeperSection />
            <TestimonialSection />
            <SignUpSection />
        </div>
    );
};

export default HomePage;