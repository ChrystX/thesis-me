export default function MultipleSelectPlayer({
                                                 options,
                                                 answer,
                                                 onAnswer,
                                             }) {
    const selected = answer ? JSON.parse(answer) : [];

    function toggle(idx) {
        const next = selected.includes(idx)
            ? selected.filter((i) => i !== idx)
            : [...selected, idx];

        onAnswer(JSON.stringify(next));
    }

    return (
        <div className="flex flex-col gap-2">
            <p className="text-xs text-gray-400">
                Select all that apply
            </p>

            {options.map((opt, idx) => {
                const isSelected = selected.includes(idx);

                return (
                    <button
                        key={idx}
                        onClick={() => toggle(idx)}
                        className={`flex items-center gap-3 rounded-lg border px-4 py-2.5 text-left text-sm transition ${
                            isSelected
                                ? "border-violet-400 bg-violet-50 text-violet-800"
                                : "border-gray-200 bg-gray-50 text-gray-700 hover:border-violet-300 hover:bg-violet-50/50"
                        }`}
                    >
                        <span
                            className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border-2 transition ${
                                isSelected
                                    ? "border-violet-500 bg-violet-500"
                                    : "border-gray-300"
                            }`}
                        >
                            {isSelected && (
                                <svg
                                    className="h-2.5 w-2.5 text-white"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2 6l3 3 5-5"
                                    />
                                </svg>
                            )}
                        </span>

                        {opt}
                    </button>
                );
            })}
        </div>
    );
}