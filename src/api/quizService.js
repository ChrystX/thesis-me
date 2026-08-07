import api from "./api.js";

export const quizService = {
    start(lessonId) {
        return api.post(`/quiz/start`, { lessonId });
    },

    submit(attemptId, answers) {
        return api.post(`/quiz/submit`, { attemptId, answers });
    },

    abandon(attemptId) {
        return api.post(`/quiz/abandon`, { attemptId });
    },

    getResult(attemptId) {
        return api.get(`/quiz/${attemptId}`);
    },

    getLatestAttempt(lessonId) {
        return api.get(`/quiz/lesson/${lessonId}/latest`);
    },

};