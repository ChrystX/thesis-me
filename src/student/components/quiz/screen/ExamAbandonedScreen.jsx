import { AlertTriangle } from "lucide-react";

export default function ExamAbandonedScreen({ loading, onStart }) {
    return (
        <div className="max-w-xl mx-auto px-5 py-12 flex flex-col items-center gap-6 text-center">
            <AlertTriangle className="h-12 w-12 text-amber-400" />
            <div>
                <h2 className="text-xl font-bold text-gray-900">Previous attempt abandoned</h2>
                <p className="text-sm text-gray-500 mt-1">You left during your last attempt.</p>
            </div>
            <button
                onClick={onStart}
                disabled={loading}
                className="w-full rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:opacity-60"
            >
                {loading ? "Starting…" : "Start Fresh"}
            </button>
        </div>
    );
}