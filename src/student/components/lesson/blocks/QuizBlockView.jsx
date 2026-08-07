import { useState } from "react";

export default function QuizBlockView({ data }) {
    const [selected, setSelected] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const isCorrect = selected === data?.correct_index;

    const handleSubmit = () => {
        if (selected !== null) setSubmitted(true);
    };

    const handleReset = () => {
        setSelected(null);
        setSubmitted(false);
    };

    if (!data?.question) return null;

    return (
        <div className="bg-gradient-to-br from-violet-50 to-pink-50 border border-violet-100 rounded-2xl p-5">
            {/* Badge */}
            <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-violet-500 bg-violet-100 px-2.5 py-1 rounded-full">
                    Quiz
                </span>
            </div>

            {/* Question */}
            <p className="font-semibold text-gray-800 mb-4 leading-snug">
                {data.question}
            </p>

            {/* Options */}
            <div className="flex flex-col gap-2 mb-4">
                {data.options?.map((opt, idx) => {
                    let style = "border-gray-200 bg-white text-gray-700 hover:border-violet-300";

                    if (submitted) {
                        if (idx === data.correct_index)   style = "border-green-400 bg-green-50 text-green-800";
                        else if (idx === selected)         style = "border-red-300 bg-red-50 text-red-700";
                        else                               style = "border-gray-100 bg-gray-50 text-gray-400";
                    } else if (selected === idx) {
                        style = "border-violet-400 bg-violet-50 text-violet-800";
                    }

                    return (
                        <button
                            key={idx}
                            disabled={submitted}
                            onClick={() => setSelected(idx)}
                            className={`text-left px-4 py-2.5 rounded-xl border-2 text-sm transition-all duration-150 ${style} disabled:cursor-default`}
                        >
                            <span className="font-medium mr-2 text-xs opacity-60">
                                {String.fromCharCode(65 + idx)}.
                            </span>
                            {opt}
                        </button>
                    );
                })}
            </div>

            {/* Actions */}
            {!submitted ? (
                <button
                    onClick={handleSubmit}
                    disabled={selected === null}
                    className="w-full py-2 rounded-xl bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                    Check Answer
                </button>
            ) : (
                <div className="flex flex-col gap-2">
                    <p className={`text-sm font-semibold text-center ${isCorrect ? "text-green-600" : "text-red-500"}`}>
                        {isCorrect ? "✓ Correct!" : "✗ Not quite — see the correct answer above."}
                    </p>
                    <button
                        onClick={handleReset}
                        className="w-full py-2 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition"
                    >
                        Try again
                    </button>
                </div>
            )}
        </div>
    );
}