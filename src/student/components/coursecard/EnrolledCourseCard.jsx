import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { studentProgressService } from "../../../api/studentProgressService.js";
import CourseImage from "../../../components/coursecard/CourseImage.jsx";

/**
 * progress shape: { courseId, completedLessons, totalLessons, percentage } | null
 */
const EnrolledCourseCard = ({ course, progress }) => {
    const navigate = useNavigate();
    const [navigating, setNavigating] = useState(false);

    const pct = progress?.percentage ?? 0;
    const completed = progress?.completedLessons ?? 0;
    const total = progress?.totalLessons ?? 0;

    const status =
        pct === 100 ? "completed" :
            pct > 0     ? "in-progress" :
                "not-started";

    const statusConfig = {
        completed:    { label: "Completed",   bg: "bg-emerald-50", text: "text-emerald-600", dot: "bg-emerald-500" },
        "in-progress":{ label: "In Progress", bg: "bg-amber-50",   text: "text-amber-600",   dot: "bg-amber-400"  },
        "not-started":{ label: "Not Started", bg: "bg-gray-100",   text: "text-gray-500",    dot: "bg-gray-400"   },
    };

    const { label, bg, text, dot } = statusConfig[status];

    const ctaLabel =
        status === "completed"    ? "Review Course" :
            status === "in-progress"  ? "Continue"      :
                "Start Course";

    const handleOpen = async () => {
        if (navigating) return;
        setNavigating(true);
        try {
            const res = await studentProgressService.getResumeLessonId(course.id);
            navigate(`/student/course/${course.id}/lesson/${res.data}`);
        } catch {
            // fallback: let the course detail handle it
            navigate(`/student/course/${course.id}`);
        } finally {
            setNavigating(false);
        }
    };

    // SVG ring
    const RADIUS = 18;
    const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
    const strokeDash = (pct / 100) * CIRCUMFERENCE;
    const ringColor = pct === 100 ? "#10b981" : "#ec4899";

    return (
        <div
            className="group bg-white rounded-2xl overflow-hidden border border-rose-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
            style={{ fontFamily: "'Lora', Georgia, serif" }}
        >
            <div className="relative">
                <CourseImage
                    image={course.image}
                    title={course.title}
                    onClick={handleOpen}
                    className="cursor-pointer"
                />
                <span
                    className={`absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${bg} ${text}`}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                    <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                    {label}
                </span>
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <h3
                    className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug mb-3 cursor-pointer hover:text-pink-600 transition-colors"
                    onClick={handleOpen}
                >
                    {course.title}
                </h3>

                <div className="flex items-center gap-3 mb-4">
                    <div className="relative flex-shrink-0 w-12 h-12">
                        <svg width="48" height="48" viewBox="0 0 48 48" className="-rotate-90">
                            <circle cx="24" cy="24" r={RADIUS} fill="none" stroke="#fce7f3" strokeWidth="4" />
                            <circle
                                cx="24" cy="24" r={RADIUS}
                                fill="none"
                                stroke={ringColor}
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray={`${strokeDash} ${CIRCUMFERENCE}`}
                                style={{ transition: "stroke-dasharray 0.6s ease" }}
                            />
                        </svg>
                        <span
                            className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            {pct}%
                        </span>
                    </div>

                    <div>
                        <p className="text-xs text-gray-500 leading-none mb-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            Lessons
                        </p>
                        <p className="text-sm font-semibold text-gray-800" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            {completed}<span className="font-normal text-gray-400"> / {total}</span>
                        </p>
                        <div className="mt-1.5 w-32 h-1.5 bg-rose-100 rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{ width: `${pct}%`, background: ringColor }}
                            />
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleOpen}
                    disabled={navigating}
                    className={`mt-auto w-full py-2 text-sm font-medium rounded-full transition-all duration-200 disabled:opacity-60
                        ${status === "completed"
                        ? "border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white"
                        : "border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white"
                    }`}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                    {navigating ? "Loading…" : ctaLabel}
                </button>
            </div>
        </div>
    );
};

export default EnrolledCourseCard;