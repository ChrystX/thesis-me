import {useEffect, useRef, useState} from "react";
import {quizService} from "../api/quizService.js";

export function useQuiz(lessonId, examMode = "high_stakes") {
    const [attemptId, setAttemptId] = useState(null);
    const [result, setResult] = useState(null);
    const [status, setStatus] = useState("idle"); // idle | started | submitted
    const [loading, setLoading] = useState(false);
    const [answers, setAnswers] = useState({});

    const attemptIdRef = useRef(null);
    useEffect(() => { attemptIdRef.current = attemptId; }, [attemptId]);

    useEffect(() => {
        let cancelled = false;
        async function hydrate() {
            setLoading(true);
            try {
                const res = await quizService.getLatestAttempt(lessonId);
                if (cancelled) return;
                const data = res.data;
                setAttemptId(data.attemptId);
                if (data.status === "submitted") {
                    setResult(data);
                    setStatus("submitted");
                } else if (data.status === "abandoned") {
                    setStatus("abandoned");
                }
                // if "in_progress": leave status as "idle" and let the
                // existing Start flow's resume logic in the backend handle it
            } catch (err) {
                // 404 = no attempt yet, this is a fresh exam — stay "idle"
            } finally {
                setLoading(false);
            }
        }
        hydrate();
        return () => { cancelled = true; };
    }, [lessonId]);

    useEffect(() => {
        if (examMode !== "high_stakes" || status !== "started") return;
        const handler = (e) => {
            e.preventDefault();
            e.returnValue = "";
        };
        window.addEventListener("beforeunload", handler);
        return () => window.removeEventListener("beforeunload", handler);
    }, [status, examMode]);

    useEffect(() => {
        if (examMode !== "high_stakes") return;
        return () => {
            if (status === "started" && attemptIdRef.current) {
                quizService.abandon(attemptIdRef.current);
            }
        };
    }, [examMode]);

    function setAnswer(questionBlockId, value) {
        setAnswers((prev) => ({ ...prev, [questionBlockId]: value }));
    }

    async function startExam() {
        setLoading(true);
        try {
            const res = await quizService.start(lessonId);
            // high stakes: if there's an abandoned attempt, backend returns it
            if (res.data.status === "abandoned") {
                setStatus("abandoned");
                return res.data;
            }
            setAttemptId(res.data.attemptId);
            setAnswers({});
            setStatus("started");
            return res.data;
        } finally {
            setLoading(false);
        }
    }

    async function resumeExam(existingAttemptId) {
        // low stakes only
        setAttemptId(existingAttemptId);
        setStatus("started");
    }


    async function submitExam() {
        if (!attemptId) return;
        console.log("submitting answers:", answers);
        setLoading(true);
        try {
            const res = await quizService.submit(attemptId, answers);
            setResult(res.data);
            setStatus("submitted");
            return res.data;
        } finally {
            setLoading(false);
        }
    }

    async function fetchResult(id) {
        setLoading(true);
        try {
            const res = await quizService.getResult(id ?? attemptId);
            setResult(res.data);
            return res.data;
        } finally {
            setLoading(false);
        }
    }

    return {
        attemptId,
        result,
        status,
        loading,
        answers,
        resumeExam,
        setAnswer,
        startExam,
        submitExam,
        fetchResult,
    };
}