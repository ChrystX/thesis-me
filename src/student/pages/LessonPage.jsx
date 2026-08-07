import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useLesson } from "../../hooks/lesson/useLesson.js";
import { useSyllabus } from "../../hooks/useSyllabus.js";
import { useStudentProgress } from "../../hooks/useStudentProgress.js";

import LessonContent from "../components/lesson/LessonContent.jsx";
import LessonNavBar from "../components/lesson/LessonNavBar.jsx";
import CourseSidebar from "../components/syllabus/CourseSidebar.jsx";
import MobileSyllabusDrawer from "../components/syllabus/MobileSyllabusDrawer.jsx";
import {useScrollCompletion} from "../hooks/useScrollCompletion.js";
import {useLessonNavigation} from "../hooks/useLessonNavigation.js";
import {useLessonCompletion} from "../hooks/useLessonCompletion.js";
import {useLessonBlocks} from "../../hooks/lesson/useLessonBlocks.js";
import ExamPlayer from "../components/quiz/ExamPlayer.jsx";

export default function LessonPage() {
    const { courseId, lessonId } = useParams();
    const navigate = useNavigate();
    const contentRef = useRef(null);

    const [drawerOpen, setDrawerOpen] = useState(false);

    const parsedLessonId = parseInt(lessonId);
    const parsedCourseId = parseInt(courseId);
    const { blocks } = useLessonBlocks(parsedLessonId);

    // Data hooks
    const { lesson, loading: lessonLoading, error: lessonError } = useLesson(parsedLessonId);
    const { sections, loading: syllabusLoading, getPrevLesson, getNextLesson } = useSyllabus(parsedCourseId);
    const { completedLessonIds, markComplete, unmarkComplete } = useStudentProgress(parsedCourseId);

    const isCompleted = completedLessonIds.includes(parsedLessonId);

    // Scroll logic
    const hasScrolledToBottom = useScrollCompletion(contentRef, [parsedLessonId]);

    // Navigation logic
    const {
        prevLesson,
        nextLesson,
        nextLessonLocked,
        canProceedToNext
    } = useLessonNavigation({
        lessonId: parsedLessonId,
        getPrevLesson,
        getNextLesson,
        isCompleted,
        hasScrolled: hasScrolledToBottom
    });

    const goToLesson = (id) => {
        navigate(`/student/course/${courseId}/lesson/${id}`);
        contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
        setDrawerOpen(false);
    };

    // Completion logic
    const handleToggleComplete = useLessonCompletion({
        lessonId: parsedLessonId,
        isCompleted,
        markComplete,
        unmarkComplete,
        nextLesson,
        goToLesson
    });

    const activeSection = sections.find(s =>
        s.lessons?.some(l => l.id === parsedLessonId)
    );

    const courseTitle = sections[0]?.courseTitle ?? "Course";

    // Loading state
    if (lessonLoading || syllabusLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-pink-200 border-t-pink-500 rounded-full animate-spin" />
                    <p className="text-sm text-gray-400">Loading lesson…</p>
                </div>
            </div>
        );
    }

    // Locked state
    if (lessonError === "locked") {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <p className="text-3xl mb-3">🔒</p>
                    <p className="text-gray-700 font-semibold mb-1">Lesson Locked</p>
                    <p className="text-gray-400 text-sm mb-4">
                        Complete the previous lesson to unlock this one.
                    </p>
                    <button
                        onClick={() => navigate(-1)}
                        className="text-pink-500 text-sm hover:underline"
                    >
                        Go back
                    </button>
                </div>
            </div>
        );
    }

    // Error state
    if (lessonError) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <p className="text-gray-500 text-sm mb-4">{lessonError}</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="text-pink-500 text-sm hover:underline"
                    >
                        Go back
                    </button>
                </div>
            </div>
        );
    }

    const sidebar = (
        <CourseSidebar
            sections={sections}
            currentLessonId={parsedLessonId}
            completedIds={completedLessonIds}
            onSelectLesson={goToLesson}
            courseTitle={courseTitle}
        />
    );

    console.log("lesson:", lesson);
    console.log("lessonType:", lesson?.lessonType);

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden" style={{ fontFamily: "'Lora', Georgia, serif" }}>
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

                {/* Header */}
                <header className="flex-shrink-0 h-14 flex items-center justify-between px-5 bg-white border-b border-gray-100 gap-4">
                    <button
                        onClick={() => navigate(`/student/dashboard`)}
                        className="flex items-center gap-1.5 text-gray-400 hover:text-gray-700 transition text-sm"
                    >
                        ← Back
                    </button>

                    <h1 className="text-sm font-semibold text-gray-700 truncate text-center flex-1">
                        {lesson?.title}
                    </h1>

                    <button
                        onClick={() => setDrawerOpen(true)}
                        className="lg:hidden text-sm text-gray-500 hover:text-gray-800"
                    >
                        Contents
                    </button>

                    <div className="hidden lg:block w-28" />
                </header>

                {/* Content */}
                <main ref={contentRef} className="flex-1 overflow-y-auto">
                    {lesson && (
                        lesson.lessonType === "exam"
                            ? <ExamPlayer
                                lesson={lesson}
                                onNext={() => nextLesson && goToLesson(nextLesson.id)}
                                onComplete={() => markComplete(parsedLessonId)}
                            />
                            : <LessonContent
                                lesson={lesson}
                                blocks={blocks}
                                sectionTitle={activeSection?.title}
                            />
                    )}
                </main>

                {/* Nav */}
                {lesson?.lessontype !== "exam" && (
                <LessonNavBar
                    prevLesson={prevLesson}
                    nextLesson={nextLesson}
                    isCompleted={isCompleted}
                    canProceedToNext={canProceedToNext}
                    hasScrolledToBottom={hasScrolledToBottom}
                    nextLessonLocked={nextLessonLocked}
                    onPrev={() => prevLesson && goToLesson(prevLesson.id)}
                    onNext={() => nextLesson && goToLesson(nextLesson.id)}
                    onToggleComplete={handleToggleComplete}
                />
                    )}
            </div>

            {/* Sidebar */}
            <div className="hidden lg:flex w-72 xl:w-80 border-l border-gray-100">
                {sidebar}
            </div>

            <MobileSyllabusDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                {sidebar}
            </MobileSyllabusDrawer>
        </div>
    );
}