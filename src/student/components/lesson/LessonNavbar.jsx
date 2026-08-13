export default function LessonNavBar({ prevLesson, nextLesson, canProceedToNext, hasScrolledToBottom, nextLessonLocked, isCompleted, onPrev, onNext, onToggleComplete }) {
    const nextDisabled = !nextLesson || !canProceedToNext;

    const nextHint = !nextLesson
    ? null
    : nextLessonLocked
        ? "Complete previous lesson first"
        : !hasScrolledToBottom
            ? "Scroll to bottom to continue"
            : null;

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
                    disabled={!isCompleted && !hasScrolledToBottom}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition border-2 ${
                        !isCompleted && !hasScrolledToBottom
                            ? "opacity-40 cursor-not-allowed"
                            : "bg-pink-600 border-pink-600 text-white hover:bg-pink-700"
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
                <div className="relative group">
                <button
                    onClick={onNext}
                    disabled={nextDisabled}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 hover:border-gray-300 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                    <span className="truncate max-w-[120px]">
                        {nextLesson?.title ?? "Next"}
                    </span>
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                    {nextDisabled && nextHint && (
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2
                                        bg-gray-800 text-white text-xs rounded-lg px-2.5 py-1.5
                                        whitespace-nowrap opacity-0 group-hover:opacity-100
                                        transition-opacity duration-150 pointer-events-none z-10">
                            {nextHint}
                            {/* little arrow */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2
                                            border-4 border-transparent border-t-gray-800" />
                        </div>
                        )}
                </div>

            </div>
        </div>
    );
}