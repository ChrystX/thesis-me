import { useRef } from "react";
import { X, Plus } from "lucide-react";

export default function MultipleChoiceBody({ data, update, readOnly }) {
    const options = data.options ?? ["", ""];
    const correctIndex = data.correct_index ?? 0;
    const optionKeys = useRef(options.map(() => crypto.randomUUID()));

    function updateOption(idx, value) {
        const next = [...options];
        next[idx] = value;
        update({ options: next });
    }

    function addOption() {
        if (options.length >= 6) return;
        optionKeys.current = [...optionKeys.current, crypto.randomUUID()];
        update({ options: [...options, ""] });
    }

    function removeOption(idx) {
        if (options.length <= 2) return;
        const next = options.filter((_, i) => i !== idx);
        optionKeys.current = optionKeys.current.filter((_, i) => i !== idx);
        const newCorrect =
            correctIndex === idx ? 0
                : correctIndex > idx ? correctIndex - 1
                    : correctIndex;
        update({ options: next, correct_index: newCorrect });
    }

    return (
        <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                Options
            </label>

            {options.map((opt, idx) => {
                const isCorrect = idx === correctIndex;
                return (
                    <div
                        key={optionKeys.current[idx]}
                        className={`flex items-center gap-2 rounded-lg border px-3 py-2 transition ${
                            isCorrect ? "border-green-300 bg-green-50" : "border-gray-200 bg-gray-50"
                        }`}
                    >
                        <button
                            disabled={readOnly}
                            onClick={() => update({ correct_index: idx })}
                            title="Mark as correct"
                            aria-label={`Mark option ${idx + 1} as correct`}
                            className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 transition ${
                                isCorrect
                                    ? "border-green-500 bg-green-500"
                                    : "border-gray-300 hover:border-violet-400"
                            } disabled:cursor-not-allowed`}
                        >
                            {isCorrect && <span className="block h-1.5 w-1.5 rounded-full bg-white" />}
                        </button>

                        <input
                            type="text"
                            disabled={readOnly}
                            value={opt}
                            onChange={(e) => updateOption(idx, e.target.value)}
                            placeholder={`Option ${idx + 1}…`}
                            className={`flex-1 bg-transparent text-sm outline-none placeholder-gray-400 disabled:opacity-60 ${
                                isCorrect ? "font-medium text-green-800" : "text-gray-700"
                            }`}
                        />

                        {!readOnly && options.length > 2 && (
                            <button
                                onClick={() => removeOption(idx)}
                                aria-label={`Remove option ${idx + 1}`}
                                className="text-gray-300 transition hover:text-red-500"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        )}
                    </div>
                );
            })}

            {!readOnly && options.length < 6 && (
                <button
                    onClick={addOption}
                    className="flex w-fit items-center gap-1 text-xs text-violet-600 hover:underline"
                >
                    <Plus className="h-3 w-3" /> Add option
                </button>
            )}

            <p className="text-xs text-gray-400">Click the circle to mark the correct answer.</p>
        </div>
    );
}