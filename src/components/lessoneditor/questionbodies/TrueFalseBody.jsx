export default function TrueFalseBody({ data, update, readOnly }) {
    const correct = data.correct_answer;

    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                Correct answer
            </label>
            <div className="flex gap-3">
                {[true, false].map((val) => {
                    const selected = correct === val;
                    return (
                        <button
                            key={String(val)}
                            disabled={readOnly}
                            onClick={() => update({ correct_answer: val })}
                            className={`flex-1 rounded-lg border py-2.5 text-sm font-medium transition disabled:cursor-not-allowed ${
                                selected
                                    ? "border-green-300 bg-green-50 text-green-800"
                                    : "border-gray-200 bg-gray-50 text-gray-500 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
                            }`}
                        >
                            {val ? "True" : "False"}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}