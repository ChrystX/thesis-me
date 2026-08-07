import { useState, useEffect } from "react";
import {studentProfileService} from "../../../../api/studentProfileService.js";

export function useStudentProfile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        studentProfileService.getProfile()
            .then(setProfile)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const updateProfile = async (dto) => {
        await studentProfileService.updateProfile(dto);
        setProfile(prev => ({ ...prev, ...dto }));
    };

    return { profile, loading, error, updateProfile };
}