import MultipleChoicePlayer from "./playerblocks/MultipleChoicePlayer.jsx";
import MultipleSelectPlayer from "./playerblocks/MultipleSelectPlayer.jsx";
import TrueFalsePlayer from "./playerblocks/TrueFalsePlayer.jsx";
import FillInBlankPlayer from "./playerblocks/FillInBlankPlayer.jsx";
import {parseDataJson} from "../../../components/lessoneditor/index.js";


export default function QuestionPlayer({ block, index, answer, onAnswer }) {
    const data = parseDataJson(block.dataJson ?? block.data_json);

    return (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50/70 px-4 py-2.5 rounded-t-xl">
                <span className="text-xs font-semibold text-gray-400">
                    Q{index + 1}
                </span>

                {data.points && (
                    <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                        {data.points} pt{data.points !== 1 ? "s" : ""}
                    </span>
                )}
            </div>

            <div className="px-4 py-4 flex flex-col gap-4">
                <p className="text-sm font-medium text-gray-800 leading-relaxed">
                    {data.question || (
                        <span className="italic text-gray-300">
                            No question text
                        </span>
                    )}
                </p>

                {data.type === "multiple_choice" && (
                    <MultipleChoicePlayer
                        options={data.options ?? []}
                        answer={answer}
                        onAnswer={onAnswer}
                    />
                )}

                {data.type === "multiple_select" && (
                    <MultipleSelectPlayer
                        options={data.options ?? []}
                        answer={answer}
                        onAnswer={onAnswer}
                    />
                )}

                {data.type === "true_false" && (
                    <TrueFalsePlayer
                        answer={answer}
                        onAnswer={onAnswer}
                    />
                )}

                {data.type === "fill_in_blank" && (
                    <FillInBlankPlayer
                        answer={answer}
                        onAnswer={onAnswer}
                    />
                )}
            </div>
        </div>
    );
}