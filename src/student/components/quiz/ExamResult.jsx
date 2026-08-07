import { CheckCircle, XCircle, Trophy } from "lucide-react";

export default function ExamResult({ result, lesson, onRetry, onNext }) {
    const { score, passed, totalQuestions, answeredCorrect } = result;

    return (
        <div className="max-w-xl mx-auto px-5 py-12 flex flex-col items-center gap-6 text-center">

            {/* Icon */}
            <div className={`flex h-20 w-20 items-center justify-center rounded-full ${
                passed ? "bg-green-100" : "bg-red-100"
            }`}>
                {passed
                    ? <Trophy className="h-10 w-10 text-green-500" />
                    : <XCircle className="h-10 w-10 text-red-400" />
                }
            </div>

            {/* Title */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900">
                    {passed ? "You passed!" : "Not quite there"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">{lesson.title}</p>
            </div>

            {/* Score card */}
            <div className="w-full rounded-xl border border-gray-200 bg-white shadow-sm divide-y divide-gray-100">
                <div className="flex items-center justify-between px-5 py-4">
                    <span className="text-sm text-gray-500">Score</span>
                    <span className={`text-2xl font-bold ${passed ? "text-green-600" : "text-red-500"}`}>
                        {score}%
                    </span>
                </div>
                <div className="flex items-center justify-between px-5 py-4">
                    <span className="text-sm text-gray-500">Correct answers</span>
                    <span className="text-sm font-semibold text-gray-700">
                        {answeredCorrect} / {totalQuestions}
                    </span>
                </div>
                <div className="flex items-center justify-between px-5 py-4">
                    <span className="text-sm text-gray-500">Passing score</span>
                    <span className="text-sm font-semibold text-gray-700">
                        {result.passingScore ?? 70}%
                    </span>
                </div>
                <div className="flex items-center justify-between px-5 py-4">
                    <span className="text-sm text-gray-500">Status</span>
                    <span className={`flex items-center gap-1.5 text-sm font-semibold ${
                        passed ? "text-green-600" : "text-red-500"
                    }`}>
                        {passed
                            ? <><CheckCircle className="h-4 w-4" /> Passed</>
                            : <><XCircle className="h-4 w-4" /> Failed</>
                        }
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 w-full">
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="flex-1 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                    >
                        Try Again
                    </button>
                )}
                {onNext && (
                    <button
                        onClick={onNext}
                        className="flex-1 rounded-xl bg-violet-600 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
                    >
                        Continue →
                    </button>
                )}
            </div>
        </div>
    );
}