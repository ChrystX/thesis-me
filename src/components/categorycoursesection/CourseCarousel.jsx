import CourseCard from "../coursecard/CourseCard.jsx";
import useHorizontalScroll from "../../hooks/useHorizontalScroll.js";

export default function CourseCarousel({ courses }) {
    const { scrollRef, isDragging, bind } = useHorizontalScroll();

    return (
        <div
            ref={scrollRef}
            {...bind}
            className={`flex gap-4 overflow-x-auto select-none ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
        >
            {courses.map(course => (
                <div key={course.id} className="flex-none w-80">
                    <CourseCard course={course} />
                </div>
            ))}
        </div>
    );
}