export default function LessonNavBar({ prevLesson, nextLesson, isCompleted, onPrev, onNext, onToggleComplete }) {
    return (
        <div className="flex-shrink-0 border-t border-gray-100 bg-white px-5 py-4">
            <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

                {/* Prev */}
                <button
                    onClick={onPrev}
                    disabled={!prevLesson}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 hover:border-gray-300 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="truncate max-w-[120px]">
                        {prevLesson?.title ?? "Previous"}
                    </span>
                </button>

                {/* Mark complete */}
                <button
                    onClick={onToggleComplete}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition border-2 ${
                        isCompleted
                            ? "bg-pink-600 border-pink-600 text-white hover:bg-pink-700"
                            : "border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-800"
                    }`}
                >
                    {isCompleted ? (
                        <>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Completed
                        </>
                    ) : (
                        "Mark as Complete"
                    )}
                </button>

                {/* Next */}
                <button
                    onClick={onNext}
                    disabled={!nextLesson}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 hover:border-gray-300 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                    <span className="truncate max-w-[120px]">
                        {nextLesson?.title ?? "Next"}
                    </span>
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>

            </div>
        </div>
    );
}