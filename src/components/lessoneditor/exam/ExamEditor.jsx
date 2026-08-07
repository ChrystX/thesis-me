import { FileText, Plus } from "lucide-react";
import ExamQuestionCard from "./ExamQuestionCard.jsx";
import ExamSettingsPanel from "./ExamSettingsPanel.jsx";
import { useExamSettings } from "./UseExamSettings.js";
import {useExamQuestions} from "./hook/useExamQuestions.js";
import AddQuestionBar from "./bar/AddQuestionBar.jsx";

export default function ExamEditor({ lessonId, lessonTitle = "Untitled Exam" }) {
    const { settings, saveSettings, saving } = useExamSettings(lessonId);
    const {
        questions, totalWeight, adding,
        addQuestion, addRloQuestion, updateQuestion, deleteQuestion,
        moveUp, moveDown, drag,
    } = useExamQuestions(lessonId);

    return (
        <div className="flex h-full flex-col overflow-hidden bg-gray-50">
            <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 shadow-sm">
                <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-violet-500" />
                    <h1 className="text-base font-semibold text-gray-900">{lessonTitle}</h1>
                    <span className="rounded-full bg-violet-50 border border-violet-200 px-2 py-0.5 text-xs text-violet-600 font-medium">
                        Exam
                    </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>
                        <span className="font-semibold text-gray-700">{questions.length}</span> question{questions.length !== 1 ? "s" : ""}
                    </span>
                    <span>
                        <span className="font-semibold text-gray-700">{settings.passing_score}%</span> to pass
                    </span>
                    {settings.time_limit_seconds && (
                        <span>
                            <span className="font-semibold text-gray-700">{settings.time_limit_seconds / 60}</span> min
                        </span>
                    )}
                    <span className="text-gray-300">|</span>
                    <span>Total weight: <span className="font-semibold text-gray-700">{totalWeight.toFixed(1)}</span></span>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                <main className="flex-1 overflow-y-auto px-6 py-6">

                    {questions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-16 text-center">
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-400">
                                <Plus className="h-6 w-6" />
                            </div>
                            <p className="text-sm font-medium text-gray-500">No questions yet</p>
                            <p className="mt-1 text-xs text-gray-400">Add one below, or pull in an existing question</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {questions.map((block, idx) => (
                                <div
                                    key={block.id}
                                    draggable
                                    onDragStart={(e) => drag.onDragStart(e, idx)}
                                    onDragOver={(e) => drag.onDragOver(e, idx)}
                                    onDrop={(e) => drag.onDrop(e, idx)}
                                    onDragEnd={drag.onDragEnd}
                                    className={`transition-transform ${
                                        drag.overIndex === idx && drag.draggingId !== block.id
                                            ? "scale-[1.01] ring-2 ring-violet-300 rounded-xl"
                                            : ""
                                    }`}
                                >
                                    <ExamQuestionCard
                                        block={block}
                                        index={idx}
                                        totalBlocks={questions.length}
                                        onUpdate={updateQuestion}
                                        onDelete={deleteQuestion}
                                        onMoveUp={moveUp}
                                        onMoveDown={moveDown}
                                        isDragging={drag.draggingId === block.id}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    <AddQuestionBar onAdd={addQuestion} onAddRlo={addRloQuestion} disabled={adding} />
                </main>

                <aside className="w-72 shrink-0 overflow-y-auto border-l border-gray-200 bg-white p-4">
                    <ExamSettingsPanel settings={settings} onChange={saveSettings} saving={saving} />
                </aside>
            </div>
        </div>
    );
}