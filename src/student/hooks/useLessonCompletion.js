export function useLessonCompletion({
                                        lessonId,
                                        isCompleted,
                                        hasScrolled,
                                        markComplete,
                                        unmarkComplete,
                                        nextLesson,
                                        goToLesson
                                    }) {
    const toggleComplete = async () => {
        if (isCompleted) {
            await unmarkComplete(lessonId);
        } else {
            if(!hasScrolled) return;
            await markComplete(lessonId);
            if (nextLesson) {
                setTimeout(() => {
                    goToLesson(nextLesson.id);
                }, 600);
            }
        }
    };

    return toggleComplete;
}