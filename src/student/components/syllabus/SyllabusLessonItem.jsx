export default function SyllabusLessonItem({ lesson, isCurrent, isCompleted, isLocked, onClick }) {
    return (
        <button
            onClick={onClick}
            disabled={isLocked}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition group ${
                isLocked
                ? "cursor-not-allowed opacity-50"
                : isCurrent ? "bg-pink-50" : "hover:bg-gray-50"
            }`}
        >
            {/* Status indicator */}
            <span className={`w-4 h-4 flex-shrink-0 rounded-full flex items-center justify-center border transition ${
                isLocked
                ? "border-gray-200 bg-gray-50":
                isCompleted
                    ? "bg-pink-500 border-pink-500 text-white"
                    : isCurrent
                        ? "border-pink-400 bg-white"
                        : "border-gray-200 bg-white group-hover:border-gray-300"
            }`}>
                {isLocked ? (
                        <svg className="w-2.5 h-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M12 15v2m-4 0h8m-8-5V9a4 4 0 018 0v3H8z" />
                        </svg>
                    ) :
                    isCompleted ? (
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                ) : isCurrent && (
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                )}
            </span>

            {/* Title */}
            <span className={`flex-1 min-w-0 text-xs leading-snug line-clamp-2 ${
                isLocked
                    ? "text-gray-400":
                isCurrent
                    ? "font-semibold text-pink-600"
                    : isCompleted
                        ? "text-gray-400"
                        : "text-gray-600 group-hover:text-gray-800"
            }`}>
                {lesson.title}
            </span>
        </button>
    );
}