import { useEffect, useCallback, useRef } from "react";

const INACTIVITY_LIMIT = 5 * 24 * 60 * 60 * 1000;
const CHECK_INTERVAL = 60 * 1000;
const LAST_ACTIVE_KEY = "last_active_at";
const ACTIVITY_EVENTS = [
    "mousemove", "mousedown", "click",
    "keydown", "scroll", "touchstart",
];

export const useInactivityLogout = (isAuthenticated, onLogout) => {
    const intervalRef = useRef(null);

    const updateLastActive = useCallback(() => {
        localStorage.setItem(LAST_ACTIVE_KEY, Date.now().toString());
    }, []);

    const checkInactivity = useCallback(() => {
        const lastActive = localStorage.getItem(LAST_ACTIVE_KEY);
        if (!lastActive) return;

        const elapsed = Date.now() - parseInt(lastActive, 10);
        if (elapsed > INACTIVITY_LIMIT) {
            onLogout();
        }
    }, [onLogout]);

    const startMonitoring = useCallback(() => {
        updateLastActive();
        ACTIVITY_EVENTS.forEach((event) =>
            window.addEventListener(event, updateLastActive, { passive: true })
        );
        intervalRef.current = setInterval(checkInactivity, CHECK_INTERVAL);
    }, [updateLastActive, checkInactivity]);

    const stopMonitoring = useCallback(() => {
        ACTIVITY_EVENTS.forEach((event) =>
            window.removeEventListener(event, updateLastActive)
        );
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, [updateLastActive]);

    useEffect(() => {
        if (isAuthenticated) {
            startMonitoring();
        } else {
            stopMonitoring();
        }
        return () => stopMonitoring();
    }, [isAuthenticated, startMonitoring, stopMonitoring]);
};

// Separate utility so AuthProvider can use it on bootstrap too
export const isSessionExpired = () => {
    const lastActive = localStorage.getItem(LAST_ACTIVE_KEY);
    if (!lastActive) return false;
    return Date.now() - parseInt(lastActive, 10) > INACTIVITY_LIMIT;
};

export const clearLastActive = () => {
    localStorage.removeItem(LAST_ACTIVE_KEY);
};