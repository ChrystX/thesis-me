import { ClipboardList, Clock, Trophy, AlertTriangle } from "lucide-react";

export default function ExamIdleScreen({ lesson, questions, settings, loading, onStart }) {
    const isHighStakes = settings.exam_mode === "high_stakes";

    return (
        <div className="max-w-xl mx-auto px-5 py-12 flex flex-col items-center gap-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-100">
                <ClipboardList className="h-8 w-8 text-violet-600" />
            </div>

            <div>
                <h2 className="text-2xl font-bold text-gray-900">{lesson.title}</h2>
                {lesson.description && (
                    <p className="text-sm text-gray-500 mt-1">{lesson.description}</p>
                )}
            </div>

            <div className="w-full rounded-xl border border-gray-200 bg-white shadow-sm divide-y divide-gray-100">
                <div className="flex items-center justify-between px-5 py-3">
                    <span className="text-sm text-gray-500 flex items-center gap-1.5">
                        <ClipboardList className="h-3.5 w-3.5" /> Questions
                    </span>
                    <span className="text-sm font-semibold text-gray-700">{questions.length}</span>
                </div>
                <div className="flex items-center justify-between px-5 py-3">
                    <span className="text-sm text-gray-500 flex items-center gap-1.5">
                        <Trophy className="h-3.5 w-3.5" /> Passing score
                    </span>
                    <span className="text-sm font-semibold text-gray-700">{settings.passing_score}%</span>
                </div>
                {settings.time_limit_seconds && (
                    <div className="flex items-center justify-between px-5 py-3">
                        <span className="text-sm text-gray-500 flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" /> Time limit
                        </span>
                        <span className="text-sm font-semibold text-gray-700">
                            {settings.time_limit_seconds / 60} min
                        </span>
                    </div>
                )}
                {settings.max_retries && (
                    <div className="flex items-center justify-between px-5 py-3">
                        <span className="text-sm text-gray-500">Max retries</span>
                        <span className="text-sm font-semibold text-gray-700">{settings.max_retries}</span>
                    </div>
                )}
            </div>

            {isHighStakes && (
                <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-left">
                    <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-700">
                        This is a high-stakes exam. Leaving the page will abandon your attempt.
                    </p>
                </div>
            )}

            <button
                onClick={onStart}
                disabled={loading}
                className="w-full rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:opacity-60"
            >
                {loading ? "Starting…" : "Start Exam"}
            </button>
        </div>
    );
}