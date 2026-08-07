import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStudentCourses } from "../../hooks/useStudentCourses.js";
import { useStudentProgress } from "../../hooks/useStudentProgress.js";
import { userStorage } from "../../utils/userStorage.js";
import DashboardView from "../components/dashboard/DashboardView.jsx";
import {StudentEventCalendar} from "../components/calendar/StudentEventCalendar.jsx";
import StudentProfileForm from "../components/profileform/StudentProfileForm.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";

export default function StudentDashboardPage() {
    const navigate = useNavigate();
    const user = userStorage.get();

    useEffect(() => {
        if (!user) navigate("/login", { replace: true });
    }, []);

    const { courses, loading: coursesLoading, error: coursesError } = useStudentCourses();
    const { allCoursesProgress, loading: progressLoading } = useStudentProgress();

    if (!user) return null;

    return (
        <>
        <Navbar />
        <DashboardView
            user={user}
            courses={courses}
            allCoursesProgress={allCoursesProgress}
            loading={coursesLoading || progressLoading}
            error={coursesError}
            onNavigate={navigate}
            calendarSection={<StudentEventCalendar />}
            profileSection={<StudentProfileForm />}
        />
        </>
    );
}