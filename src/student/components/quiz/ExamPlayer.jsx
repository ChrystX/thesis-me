import { useEffect, useState } from "react";
import {useLessonBlocks} from "../../../hooks/lesson/useLessonBlocks.js";
import {useQuiz} from "../../../hooks/useQuiz.js";
import ExamIdleScreen from "./screen/ExamIdleScreen.jsx";
import ExamAbandonedScreen from "./screen/ExamAbandonedScreen.jsx";
import {BLOCK_TYPE} from "../../../components/lessoneditor/index.js";
import ExamInProgress from "./screen/ExamInProgress.jsx";
import ExamResult from "./ExamResult.jsx";

export default function ExamPlayer({ lesson, onNext, onComplete }) {
    const lessonId = lesson.id;
    const settings = lesson.settingsJson
        ? JSON.parse(lesson.settingsJson)
        : { passing_score: 70, exam_mode: "high_stakes" };

    const { blocks } = useLessonBlocks(lessonId);
    const questions = [...(blocks ?? [])]
        .filter((b) => b.blockTypeId === BLOCK_TYPE.QUESTION)
        .sort((a, b) => a.orderIndex - b.orderIndex);

    const { status, loading, answers, result, setAnswer, startExam, submitExam } =
        useQuiz(lessonId, settings.exam_mode);

    // Timer
    const [secondsLeft, setSecondsLeft] = useState(null);

    async function handleSubmit() {
        const res = await submitExam();
        if (res?.passed && onComplete) await onComplete();
    }

    useEffect(() => {
        if (status !== "started" || !settings.time_limit_seconds) return;
        setSecondsLeft(settings.time_limit_seconds);
        const interval = setInterval(() => {
            setSecondsLeft((s) => {
                if (s <= 1) {
                    clearInterval(interval);
                    handleSubmit();
                    return 0;
                }
                return s - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [status]);

    if (status === "idle") return (
        <ExamIdleScreen
            lesson={lesson}
            questions={questions}
            settings={settings}
            loading={loading}
            onStart={startExam}
        />
    );

    if (status === "abandoned") return (
        <ExamAbandonedScreen
            loading={loading}
            onStart={startExam}
        />
    );

    if (status === "submitted") return (
        <ExamResult
            result={result}
            lesson={lesson}
            onRetry={settings.max_retries !== 0 ? startExam : null}
            onNext={onNext}
        />
    );

    return (
        <ExamInProgress
            questions={questions}
            answers={answers}
            onAnswer={setAnswer}
            onSubmit={handleSubmit}
            loading={loading}
            secondsLeft={secondsLeft}
        />
    );
}