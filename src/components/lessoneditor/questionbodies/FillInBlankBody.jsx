export default function FillInBlankBody({ data, update, readOnly }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                Correct answer
            </label>
            <input
                type="text"
                disabled={readOnly}
                value={data.correct_answer ?? ""}
                onChange={(e) => update({ correct_answer: e.target.value })}
                placeholder="Expected answer…"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100 disabled:opacity-60"
            />
            <p className="text-xs text-gray-400">Comparison is case-insensitive.</p>
        </div>
    );
}