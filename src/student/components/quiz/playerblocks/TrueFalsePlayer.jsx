export default function TrueFalsePlayer({
                                            answer,
                                            onAnswer,
                                        }) {
    return (
        <div className="flex gap-3">
            {["true", "false"].map((val) => {
                const selected = answer === val;

                return (
                    <button
                        key={val}
                        onClick={() => onAnswer(val)}
                        className={`flex-1 rounded-lg border py-2.5 text-sm font-medium transition ${
                            selected
                                ? "border-violet-400 bg-violet-50 text-violet-800"
                                : "border-gray-200 bg-gray-50 text-gray-500 hover:border-violet-300 hover:bg-violet-50/50"
                        }`}
                    >
                        {val === "true" ? "True" : "False"}
                    </button>
                );
            })}
        </div>
    );
}