import axios from "axios";
import {tokenStorage} from "../utils/tokenStorage.js";
import {userStorage} from "../utils/userStorage.js";
import { refreshStorage } from "../utils/refreshStorage.js";

const api = axios.create({
    baseURL: "http://localhost:5067/api",
});

const SKIP_REFRESH_ROUTES = [
    "/auth/reset-password",
    "/auth/forgot-password",
    "/auth/login",
    "/auth/refresh",
];

// Queue to hold requests while refresh is in progress
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        error ? prom.reject(error) : prom.resolve(token);
    });
    failedQueue = [];
};

api.interceptors.request.use(
    (config) => {
        const token = tokenStorage.get();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        const shouldSkip = SKIP_REFRESH_ROUTES.some(route =>
            originalRequest.url?.includes(route)
        );

        if (error.response?.status === 401 && !originalRequest._retry && !shouldSkip) {

            // If a refresh is already in progress, queue this request
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(token => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch(err => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = refreshStorage.getRefresh();
                if (!refreshToken) throw new Error("No refresh token");

                const response = await axios.post(
                    "http://localhost:5067/api/auth/refresh",
                    { refreshToken }
                );

                const { accessToken, refreshToken: newRefreshToken } = response.data;

                tokenStorage.set(accessToken);
                refreshStorage.setRefresh(newRefreshToken);

                // Resume all queued requests with the new token
                processQueue(null, accessToken);

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return api(originalRequest);

            } catch (refreshError) {
                // Reject all queued requests and log out
                processQueue(refreshError, null);
                tokenStorage.clear();
                refreshStorage.clearRefresh();
                userStorage.clear();
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;