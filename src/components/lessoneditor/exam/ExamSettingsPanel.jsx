import { Timer, Trophy, RefreshCw, Shuffle } from "lucide-react";

export default function ExamSettingsPanel({ settings, onChange, saving }) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/70 px-4 py-2.5 rounded-t-xl">
                <h2 className="text-sm font-semibold text-gray-700">Exam Settings</h2>
                {saving && <span className="text-xs text-gray-400">Saving…</span>}
            </div>

            <div className="grid grid-cols-2 gap-4 p-4">
                {/* Passing score */}
                <div className="flex flex-col gap-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400 uppercase tracking-wide">
                        <Trophy className="h-3.5 w-3.5" /> Passing Score %
                    </label>
                    <input
                        type="number"
                        min={0}
                        max={100}
                        value={settings.passing_score ?? ""}
                        placeholder="70"
                        onChange={(e) => onChange({
                            passing_score: e.target.value ? parseInt(e.target.value) : null
                        })}
                        onBlur={(e) => {
                            if (settings.passing_score === null || settings.passing_score === undefined) {
                                onChange({ passing_score: 70 });
                            }
                        }}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
                    />
                </div>

                {/* Time limit */}
                <div className="flex flex-col gap-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400 uppercase tracking-wide">
                        <Timer className="h-3.5 w-3.5" /> Time Limit (mins)
                    </label>
                    <input
                        type="number"
                        min={1}
                        value={settings.time_limit_seconds ? settings.time_limit_seconds / 60 : ""}
                        placeholder="No limit"
                        onChange={(e) => onChange({
                            time_limit_seconds: e.target.value ? parseInt(e.target.value) * 60 : null
                        })}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
                    />
                </div>

                {/* Max retries */}
                <div className="flex flex-col gap-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400 uppercase tracking-wide">
                        <RefreshCw className="h-3.5 w-3.5" /> Max Retries
                    </label>
                    <input
                        type="number"
                        min={0}
                        value={settings.max_retries ?? ""}
                        placeholder="Unlimited"
                        onChange={(e) => onChange({
                            max_retries: e.target.value ? parseInt(e.target.value) : null
                        })}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
                    />
                </div>

                {/* Shuffle */}
                <div className="flex flex-col gap-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400 uppercase tracking-wide">
                        <Shuffle className="h-3.5 w-3.5" /> Shuffle Questions
                    </label>
                    <button
                        onClick={() => onChange({ shuffle_questions: !settings.shuffle_questions })}
                        className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                            settings.shuffle_questions
                                ? "border-violet-300 bg-violet-50 text-violet-700"
                                : "border-gray-200 bg-gray-50 text-gray-500 hover:border-violet-200 hover:bg-violet-50/50"
                        }`}
                    >
                        <span className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                            settings.shuffle_questions ? "border-violet-500 bg-violet-500" : "border-gray-300"
                        }`}>
                            {settings.shuffle_questions && <span className="block h-1.5 w-1.5 rounded-full bg-white" />}
                        </span>
                        {settings.shuffle_questions ? "On" : "Off"}
                    </button>
                </div>

                {/* stake */}
                <div className="flex gap-2">
                    {["low_stakes", "high_stakes"].map((mode) => (
                        <button
                            key={mode}
                            onClick={() => onChange({ exam_mode: mode })}
                            className={`flex-1 rounded-lg border py-2 text-xs font-medium transition ${
                                settings.exam_mode === mode
                                    ? "border-violet-300 bg-violet-50 text-violet-700"
                                    : "border-gray-200 bg-gray-50 text-gray-500 hover:border-violet-200"
                            }`}
                        >
                            {mode === "low_stakes" ? "📝 Low Stakes" : "🎯 High Stakes"}
                        </button>
                    ))}
                </div>

            </div>
        </div>
    );
}