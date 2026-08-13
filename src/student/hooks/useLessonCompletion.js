export function useLessonCompletion({
                                        lessonId,
                                        isCompleted,
                                        markComplete,
                                        unmarkComplete,
                                        nextLesson,
                                        goToLesson
                                    }) {
    const toggleComplete = async () => {
        if (isCompleted) {
            await unmarkComplete(lessonId);
        } else {
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