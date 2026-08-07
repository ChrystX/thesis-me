import SyllabusSection from "./SyllabusSection.jsx";
import {calculateCourseProgress} from "../../utils/ProgresssUtils.js";

export default function CourseSidebar({ sections, currentLessonId, completedIds, onSelectLesson, courseTitle }) {
    const { completed, total, pct } = calculateCourseProgress(sections, completedIds);
    const activeSection = sections.find(s => s.lessons.some(l => l.id === currentLessonId));

    const allLessons = sections.flatMap(s => s.lessons ?? []);

    const isLessonLocked = (lessonId) => {
        const idx = allLessons.findIndex(l => l.id === lessonId);
        if (idx <= 0) return false;
        return !completedIds.includes(allLessons[idx - 1].id);
    };

    return (
        <aside className="flex flex-col h-full bg-white">

            <div className="px-5 py-5 border-b border-gray-100 flex-shrink-0">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Course</p>
                <h2 className="text-sm font-bold text-gray-800 leading-snug line-clamp-2">{courseTitle}</h2>
                <div className="mt-3">
                    <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs text-gray-400">{completed}/{total} lessons</span>
                        <span className="text-xs font-semibold text-pink-500">{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-pink-400 to-rose-400 rounded-full transition-all duration-700"
                            style={{ width: `${pct}%` }}
                        />
                    </div>
                </div>
            </div>

            <nav className="flex-1 overflow-y-auto py-3 px-2">
                {sections.map((section, si) => (
                    <SyllabusSection
                        key={section.id}
                        section={section}
                        sectionIndex={si}
                        currentLessonId={currentLessonId}
                        completedIds={completedIds}
                        isLessonLocked={isLessonLocked}
                        onSelectLesson={onSelectLesson}
                        defaultOpen={section.id === activeSection?.id}
                    />
                ))}
            </nav>

        </aside>
    );
}