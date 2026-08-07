import { useCallback, useEffect, useState } from "react";
import {lessonService} from "../../../api/lessonService.js";


const DEFAULT_SETTINGS = {
    passing_score: 70,
    time_limit_seconds: null,
    max_retries: null,
    shuffle_questions: false,
};

export function useExamSettings(lessonId) {
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);
    const [saving, setSaving] = useState(false);

    const fetchSettings = useCallback(async () => {
        if (!lessonId) return;
        try {
            const res = await lessonService.getLesson(lessonId);
            const raw = res.data.settingsJson;
            if (raw) {
                const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
                setSettings({ ...DEFAULT_SETTINGS, ...parsed });
            }
        } catch (err) {
            console.error("Failed to fetch exam settings", err);
        }
    }, [lessonId]);

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    const saveSettings = async (patch) => {
        const next = { ...settings, ...patch };
        setSettings(next);
        setSaving(true);
        try {
            await lessonService.updateSettings(lessonId, { settingsJson: JSON.stringify(next) });
        } catch (err) {
            console.error("Failed to save exam settings", err);
        } finally {
            setSaving(false);
        }
    };

    return { settings, saveSettings, saving };
}