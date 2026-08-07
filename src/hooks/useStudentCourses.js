import { useState, useEffect } from "react";
import {studentCourseService} from "../api/studentCourseService.js";

export const useStudentCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await studentCourseService.getMyCourses();
            console.log("Courses response:", response);
            setCourses(response);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load your courses.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return { courses, loading, error, refetch: fetchCourses };
};