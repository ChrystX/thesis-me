export default function FillInBlankPlayer({
                                              answer,
                                              onAnswer,
                                          }) {
    return (
        <input
            type="text"
            value={answer ?? ""}
            onChange={(e) => onAnswer(e.target.value)}
            placeholder="Type your answer…"
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
        />
    );
}