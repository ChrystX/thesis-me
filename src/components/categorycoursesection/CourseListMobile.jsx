import CourseCard from "../coursecard/CourseCard.jsx";

export default function CourseListMobile({ courses }) {
    if (!courses.length) {
        return <p className="text-center text-gray-500 py-6">No courses available</p>;
    }

    return (
        <div className="space-y-4">
            {courses.slice(0, 3).map(course => (
                <CourseCard key={course.Id} course={course} />
            ))}
        </div>
    );
}