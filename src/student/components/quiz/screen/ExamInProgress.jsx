import { Clock, ChevronLeft, ChevronRight } from "lucide-react";
import QuestionPlayer from "../QuestionPlayer.jsx";
import {useState} from "react";
import QuestionNavigator from "./QuestionNavigator.jsx";

export default function ExamInProgress({ questions, answers, onAnswer, onSubmit, loading, secondsLeft }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const answeredCount = Object.keys(answers).length;
    const currentBlock = questions[currentIndex];
    const isLast = currentIndex === questions.length - 1;

    function formatTime(s) {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m}:${sec.toString().padStart(2, "0")}`;
    }

    function goTo(i) {
        if (i < 0 || i >= questions.length) return;
        setCurrentIndex(i);
    }

    return (
        <div className="max-w-5xl mx-auto px-5 py-8 flex flex-col lg:flex-row gap-6">
            {/* Main question column */}
            <div className="flex-1 flex flex-col gap-4 min-w-0">
                <div className="flex items-center justify-between">
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

                {currentBlock && (
                    <QuestionPlayer
                        key={currentBlock.id}
                        block={currentBlock}
                        index={currentIndex}
                        answer={answers[currentBlock.id]}
                        onAnswer={(val) => onAnswer(currentBlock.id, val)}
                    />
                )}

                <div className="flex items-center justify-between mt-2">
                    <button
                        onClick={() => goTo(currentIndex - 1)}
                        disabled={currentIndex === 0}
                        className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft className="h-4 w-4" /> Previous
                    </button>

                    {isLast ? (
                        <button
                            onClick={onSubmit}
                            disabled={loading}
                            className="rounded-xl bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:opacity-60"
                        >
                            {loading ? "Submitting…" : "Submit Exam"}
                        </button>
                    ) : (
                        <button
                            onClick={() => goTo(currentIndex + 1)}
                            className="flex items-center gap-1 rounded-lg bg-violet-600 px-3 py-2 text-sm font-semibold text-white hover:bg-violet-700"
                        >
                            Next <ChevronRight className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Navigator sidebar */}
            <div className="lg:w-56 flex-shrink-0">
                <div className="lg:sticky lg:top-6 rounded-xl border border-gray-200 bg-white p-4">
                    <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-400">
                        Questions
                    </p>
                    <QuestionNavigator
                        questions={questions}
                        answers={answers}
                        currentIndex={currentIndex}
                        onJump={goTo}
                    />
                    <button
                        onClick={onSubmit}
                        disabled={loading}
                        className="mt-4 w-full rounded-lg bg-gray-900 py-2 text-xs font-semibold text-white hover:bg-gray-700 disabled:opacity-60"
                    >
                        {loading ? "Submitting…" : "Submit Exam"}
                    </button>
                </div>
            </div>
        </div>
    );
}