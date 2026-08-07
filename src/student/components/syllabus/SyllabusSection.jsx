import { useState } from "react";
import SyllabusLessonItem from "./SyllabusLessonItem.jsx";
import {calculateSectionProgress} from "../../utils/ProgresssUtils.js";

export default function SyllabusSection({ section, sectionIndex, currentLessonId, completedIds, onSelectLesson, defaultOpen, isLessonLocked }) {
    const [isOpen, setIsOpen] = useState(defaultOpen ?? false);
    const { done, total, allDone } = calculateSectionProgress(section, completedIds);

    return (
        <div className="mb-1">
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition group text-left"
            >
                <span className={`text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 transition ${
                    allDone
                        ? "bg-pink-500 text-white"
                        : "bg-gray-100 text-gray-400 group-hover:bg-pink-50 group-hover:text-pink-400"
                }`}>
                    {allDone ? "✓" : sectionIndex + 1}
                </span>

                <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-600 group-hover:text-gray-900 leading-snug truncate">
                        {section.title}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                        {done}/{total} completed
                    </p>
                </div>

                <svg
                    className={`w-3.5 h-3.5 text-gray-300 flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {isOpen && (
                <div className="ml-4 mt-0.5 flex flex-col gap-0.5">
                    {section.lessons.map((lesson) => (
                        <SyllabusLessonItem
                            key={lesson.id}
                            lesson={lesson}
                            isCurrent={lesson.id === currentLessonId}
                            isCompleted={completedIds.includes(lesson.id)}
                            isLocked={isLessonLocked?.(lesson.id) ?? false}
                            onClick={() => onSelectLesson(lesson.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}