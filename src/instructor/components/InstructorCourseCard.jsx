const InstructorCourseCard = ({ course, onManage }) => {
    return (
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
            {course.image && (
                <div className="relative h-36 bg-gray-100 overflow-hidden">
                    <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 right-2 text-xs font-medium px-2 py-1 rounded-full bg-white/90 text-pink-600 border border-pink-100">
                        {course.instructorType}
                    </span>
                </div>
            )}

            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug mb-1">
                    {course.title}
                </h3>

                {course.description && (
                    <p className="text-xs text-gray-500 line-clamp-2 mb-4">
                        {course.description}
                    </p>
                )}

                <button
                    onClick={() => onManage(course)}
                    className="mt-auto w-full py-2 text-sm font-medium text-white bg-pink-600 rounded-full hover:bg-pink-700 transition"
                >
                    Manage Course
                </button>
            </div>
        </div>
    );
};

export default InstructorCourseCard;