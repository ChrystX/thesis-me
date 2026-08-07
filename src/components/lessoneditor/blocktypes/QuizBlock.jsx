import {useRef} from "react";

export default function QuizBlock({ data, onChange, readOnly = false }) {
    const options = data.options ?? ["", ""];
    const correctIndex = data.correct_index ?? 0;

    const update = (patch) => onChange({ ...data, ...patch });

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

    function setCorrect(idx) {
        update({ correct_index: idx });
    }

    const optionKeys = useRef(options.map((_, i) => crypto.randomUUID()));

    return (
        <div className="flex flex-col gap-3 px-4 pb-4 pt-3">
            <input
                type="text"
                disabled={readOnly}
                value={data.question ?? ""}
                onChange={(e) => update({ question: e.target.value })}
                placeholder="Enter your question…"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-800 placeholder-gray-400 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100 disabled:opacity-60"
            />

            <div className="flex flex-col gap-2">
                {options.map((opt, idx) => {
                    const isCorrect = idx === correctIndex;
                    return (
                        <div
                            key={idx}
                            className={`flex items-center gap-2 rounded-lg border px-3 py-2 transition ${
                                isCorrect ? "border-green-300 bg-green-50" : "border-gray-200 bg-gray-50"
                            }`}
                        >
                            <button
                                disabled={readOnly}
                                onClick={() => setCorrect(idx)}
                                title="Mark as correct answer"
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
                                    className="text-gray-300 transition hover:text-red-500"
                                    title="Remove option"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            {!readOnly && options.length < 6 && (
                <button
                    onClick={addOption}
                    className="flex w-fit items-center gap-1 text-xs text-violet-600 hover:underline"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add option
                </button>
            )}

            <p className="text-xs text-gray-400">
                Click the circle next to the correct answer to mark it.
            </p>
        </div>
    );
}