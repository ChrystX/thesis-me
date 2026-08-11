function isAnswered(value) {
    if (value === undefined || value === null || value === "") return false;
    if (Array.isArray(value)) return value.length > 0;
    return true;
}

export default function QuestionNavigator({ questions, answers, currentIndex, onJump }) {
    return (
        <div className="grid grid-cols-5 gap-2">
            {questions.map((q, i) => {
                const answered = isAnswered(answers[q.id]);
                const current = i === currentIndex;
                return (
                    <button
                        key={q.id}
                        onClick={() => onJump(i)}
                        title={answered ? "Answered" : "Not answered"}
                        className={`h-9 w-9 rounded-lg text-sm font-semibold transition ${
                            current
                                ? "bg-violet-600 text-white ring-2 ring-violet-300"
                                : answered
                                    ? "bg-violet-100 text-violet-700 hover:bg-violet-200"
                                    : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                        }`}
                    >
                        {i + 1}
                    </button>
                );
            })}
        </div>
    );
}