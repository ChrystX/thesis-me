export default function MultipleChoicePlayer({
                                                 options,
                                                 answer,
                                                 onAnswer,
                                             }) {
    return (
        <div className="flex flex-col gap-2">
            {options.map((opt, idx) => {
                const selected = answer === String(idx);

                return (
                    <button
                        key={idx}
                        onClick={() => onAnswer(String(idx))}
                        className={`flex items-center gap-3 rounded-lg border px-4 py-2.5 text-left text-sm transition ${
                            selected
                                ? "border-violet-400 bg-violet-50 text-violet-800"
                                : "border-gray-200 bg-gray-50 text-gray-700 hover:border-violet-300 hover:bg-violet-50/50"
                        }`}
                    >
                        <span
                            className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 transition ${
                                selected
                                    ? "border-violet-500 bg-violet-500"
                                    : "border-gray-300"
                            }`}
                        >
                            {selected && (
                                <span className="block h-1.5 w-1.5 rounded-full bg-white" />
                            )}
                        </span>

                        {opt}
                    </button>
                );
            })}
        </div>
    );
}