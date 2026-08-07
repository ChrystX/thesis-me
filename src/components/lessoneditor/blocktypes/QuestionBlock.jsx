import MultipleChoiceBody from "../questionbodies/MultipleChoiceBody.jsx";
import MultipleSelectBody from "../questionbodies/MultipleSelectBody.jsx";
import TrueFalseBody from "../questionbodies/TrueFalseBody.jsx";
import FillInBlankBody from "../questionbodies/FillInBlankBody.jsx";


const QUESTION_TYPES = [
    { value: "multiple_choice", label: "Multiple choice" },
    { value: "multiple_select", label: "Multiple select" },
    { value: "true_false",      label: "True / false" },
    { value: "fill_in_blank",   label: "Fill in the blank" },
];

const BODY = {
    multiple_choice: MultipleChoiceBody,
    multiple_select: MultipleSelectBody,
    true_false:      TrueFalseBody,
    fill_in_blank:   FillInBlankBody,
};

export default function QuestionBlock({ data, onChange, readOnly = false }) {
    const type = data.type ?? "multiple_choice";
    const update = (patch) => onChange({ ...data, ...patch });
    const Body = BODY[type] ?? MultipleChoiceBody;

    return (
        <div className="flex flex-col gap-4 px-4 pb-4 pt-3">

            {/* Type selector */}
            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                    Question type
                </label>
                <select
                    disabled={readOnly || !!data.type}
                    value={type}
                    onChange={(e) => update({ type: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100 disabled:opacity-60"
                >
                    {QUESTION_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                </select>
                {!!data.type && !readOnly && (
                    <p className="text-xs text-gray-400">Type is locked after first save.</p>
                )}
            </div>

            {/* Question text */}
            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                    Question
                </label>
                <textarea
                    disabled={readOnly}
                    value={data.question ?? ""}
                    onChange={(e) => update({ question: e.target.value })}
                    placeholder="Enter your question…"
                    rows={2}
                    className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100 disabled:opacity-60"
                />
            </div>

            {/* Type-specific body */}
            <Body data={data} update={update} readOnly={readOnly} />

            {/* Points + Weight */}
            <div className="flex items-center gap-4 border-t border-gray-100 pt-3">
                <div className="flex items-center gap-2">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wide whitespace-nowrap">
                        Points
                    </label>
                    <input
                        type="number"
                        disabled={readOnly}
                        value={data.points ?? 1}
                        min={1}
                        onChange={(e) => update({ points: parseInt(e.target.value) || 1 })}
                        className="w-16 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-800 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100 disabled:opacity-60"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wide whitespace-nowrap">
                        Weight
                    </label>
                    <input
                        type="number"
                        disabled={readOnly}
                        value={data.weight ?? 1}
                        min={0.1}
                        step={0.1}
                        onChange={(e) => update({ weight: parseFloat(e.target.value) || 1 })}
                        className="w-16 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-800 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100 disabled:opacity-60"
                    />
                </div>

                <span className="text-xs text-gray-400">Unset weight = equal share of 100</span>
            </div>

        </div>
    );
}