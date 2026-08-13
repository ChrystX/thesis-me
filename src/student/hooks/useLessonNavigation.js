export function useLessonNavigation({
                                        lessonId,
                                        getPrevLesson,
                                        getNextLesson,
                                        isCompleted,
                                        hasScrolled
                                    }) {
    const prevLesson = getPrevLesson(lessonId);
    const nextLesson = getNextLesson(lessonId);

    const nextLessonLocked = !!nextLesson && !isCompleted;
    const canProceedToNext = !!nextLesson && hasScrolled;

    return {
        prevLesson,
        nextLesson,
        nextLessonLocked,
        canProceedToNext
    };
}