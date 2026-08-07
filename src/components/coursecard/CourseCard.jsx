import { useNavigate } from "react-router-dom";
import { truncate } from "./utils.js";
import CourseImage from "./CourseImage.jsx";
import CourseMeta from "./CourseMeta.jsx";

const formatIDR = (price) => {
    if (price == null) return null;
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
};

const CourseCard = ({ course }) => {
    const navigate = useNavigate();
    const goToDetail = () => navigate(`/course/${course.id}`);
    const formattedPrice = formatIDR(course.price);

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm h-full flex flex-col">
            <CourseImage image={course.image} title={course.title} onClick={goToDetail} />

            <div className="p-3 flex flex-col flex-grow">
                <div className="h-10 mb-2">
                    <h3
                        className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 leading-5 cursor-pointer hover:text-pink-600"
                        onClick={goToDetail}
                    >
                        {truncate(course.title)}
                    </h3>
                </div>

                <CourseMeta rating={course.rating} duration={course.duration} />

                <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                    {course.description || 'No description available'}
                </p>

                {/* Price */}
                <div className="mb-3">
                    {formattedPrice ? (
                        <span className="text-sm font-bold text-pink-600">{formattedPrice}</span>
                    ) : (
                        <span className="text-sm font-semibold text-green-600">Free</span>
                    )}
                </div>

                <button
                    onClick={goToDetail}
                    className="mt-auto w-full py-2 text-sm font-medium text-pink-600 border-2 border-pink-600 rounded-full hover:bg-pink-600 hover:text-white transition"
                >
                    View Program
                </button>
            </div>
        </div>
    );
};

export default CourseCard;