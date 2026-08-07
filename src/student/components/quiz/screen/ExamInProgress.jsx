import { Clock } from "lucide-react";
import QuestionPlayer from "../QuestionPlayer.jsx";

export default function ExamInProgress({ questions, answers, onAnswer, onSubmit, loading, secondsLeft }) {
    const answeredCount = Object.keys(answers).length;

    function formatTime(s) {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m}:${sec.toString().padStart(2, "0")}`;
    }

    return (
        <div className="max-w-2xl mx-auto px-5 py-8 flex flex-col gap-4">

            {/* Progress */}
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400">
                    {answeredCount} / {questions.length} answered
                </span>
                {secondsLeft !== null && (
                    <span className={`text-xs font-semibold ${secondsLeft < 60 ? "text-red-500" : "text-gray-500"}`}>
                        <Clock className="inline h-3 w-3 mr-1" />
                        {formatTime(secondsLeft)}
                    </span>
                )}
            </div>

            <div className="w-full h-1.5 rounded-full bg-gray-100">
                <div
                    className="h-1.5 rounded-full bg-violet-400 transition-all"
                    style={{ width: `${questions.length ? (answeredCount / questions.length) * 100 : 0}%` }}
                />
            </div>

            {/* Questions */}
            <div className="flex flex-col gap-4 mt-2">
                {questions.map((block, idx) => (
                    <QuestionPlayer
                        key={block.id}
                        block={block}
                        index={idx}
                        answer={answers[block.id]}
                        onAnswer={(val) => onAnswer(block.id, val)}
                    />
                ))}
            </div>

            {/* Submit */}
            <div className="sticky bottom-0 bg-gray-50 pt-4 pb-2">
                {answeredCount < questions.length && (
                    <p className="text-xs text-gray-400 text-center mb-2">
                        {questions.length - answeredCount} question{questions.length - answeredCount !== 1 ? "s" : ""} unanswered
                    </p>
                )}
                <button
                    onClick={onSubmit}
                    disabled={loading}
                    className="w-full rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:opacity-60"
                >
                    {loading ? "Submitting…" : "Submit Exam"}
                </button>
            </div>
        </div>
    );
}