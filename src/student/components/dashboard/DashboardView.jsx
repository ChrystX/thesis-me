import EnrolledCourseCard from "../coursecard/EnrolledCourseCard.jsx";
import {useCollapsible} from "./hooks/useCollapsible.js";

const DashboardView = ({ user, courses = [], allCoursesProgress = [], loading, error, onNavigate, calendarSection, profileSection  }) => {
    const getProgress = (courseId) =>
        allCoursesProgress.find((p) => p.courseId === courseId) ?? null;

    const profile = useCollapsible();
    const completedCount  = allCoursesProgress.filter((p) => p.percentage === 100).length;
    const inProgressCount = allCoursesProgress.filter((p) => p.percentage > 0 && p.percentage < 100).length;
    const displayName     = user.displayId || user.username || "there";

    return (
        <div className="min-h-screen bg-[#fdf8f6]" style={{ fontFamily: "'Lora', Georgia, serif" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600&display=swap');
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .fade-up { animation: fadeUp 0.5s ease both; }
            `}</style>

            <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-rose-100">
                <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
                    <span
                        className="text-lg font-bold tracking-tight text-pink-600 cursor-pointer"
                        onClick={() => onNavigate("/")}
                    >
                        DeWave
                    </span>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => onNavigate("/explore")}
                            className="text-sm text-gray-500 hover:text-pink-600 transition"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            Explore courses →
                        </button>
                        <span
                            className="text-xs text-gray-400 hidden sm:inline"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            {user.email}
                        </span>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-5 py-10">

                {loading && (
                    <div className="flex items-center justify-center py-32">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-8 h-8 border-2 border-pink-200 border-t-pink-500 rounded-full animate-spin" />
                            <p className="text-sm text-gray-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                Loading your courses…
                            </p>
                        </div>
                    </div>
                )}

                {!loading && error && (
                    <div className="flex items-center justify-center py-32">
                        <p className="text-gray-500 text-sm">{error}</p>
                    </div>
                )}

                {!loading && !error && (
                    <>
                        <div className="mb-10 fade-up">
                            <p
                                className="text-xs uppercase tracking-widest text-pink-400 mb-1"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                                My Learning
                            </p>
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                                Welcome back, {displayName}
                            </h1>
                            {courses.length > 0 && (
                                <p className="mt-2 text-sm text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                    {courses.length} enrolled
                                    {completedCount  > 0 && ` · ${completedCount} completed`}
                                    {inProgressCount > 0 && ` · ${inProgressCount} in progress`}
                                </p>
                            )}
                        </div>

                        {courses.length > 0 && (
                            <div className="grid grid-cols-3 gap-3 mb-10 fade-up" style={{ animationDelay: "0.08s" }}>
                                {[
                                    { label: "Enrolled",    value: courses.length },
                                    { label: "In Progress", value: inProgressCount },
                                    { label: "Completed",   value: completedCount },
                                ].map((s) => (
                                    <div
                                        key={s.label}
                                        className="bg-white rounded-2xl border border-rose-100 px-4 py-4 text-center shadow-sm"
                                    >
                                        <p className="text-2xl font-bold text-pink-600">{s.value}</p>
                                        <p className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                            {s.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {calendarSection && (
                            <div className="mb-10 fade-up" style={{ animationDelay: "0.12s" }}>
                                {calendarSection}
                            </div>
                        )}

                        {profileSection && (
                            <div className="mb-10 fade-up" style={{ animationDelay: "0.16s" }}>
                                <button onClick={profile.toggle} className="flex items-center gap-2 mb-3">
                                    <p
                                        className="text-xs uppercase tracking-widest text-pink-400"
                                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                                    >
                                        My Profile
                                    </p>
                                    <span
                                        className="text-pink-300 text-xs transition-transform duration-300"
                                        style={{ transform: profile.open ? "rotate(180deg)" : "rotate(0deg)" }}
                                    >
                                    </span>
                                </button>
                                <div
                                    className="overflow-hidden transition-all duration-300 ease-in-out"
                                    style={{ maxHeight: profile.open ? "1000px" : "0px", opacity: profile.open ? 1 : 0 }}
                                >
                                    <div className="bg-white rounded-2xl border border-rose-100 shadow-sm px-6 py-6">
                                        {profileSection}
                                    </div>
                                </div>
                            </div>
                        )}

                        {courses.length === 0 ? (
                            <div className="text-center py-24 fade-up" style={{ animationDelay: "0.1s" }}>
                                <p className="text-5xl mb-4">📚</p>
                                <p className="text-gray-700 font-semibold text-lg mb-1">No courses yet</p>
                                <p className="text-gray-400 text-sm mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                    Explore our catalogue and start learning today.
                                </p>
                                <button
                                    onClick={() => onNavigate("/explore")}
                                    className="px-6 py-2.5 bg-pink-600 text-white text-sm font-medium rounded-full hover:bg-pink-700 transition"
                                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                                >
                                    Browse Courses
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {courses.map((course, i) => (
                                    <div
                                        key={course.id}
                                        className="fade-up"
                                        style={{ animationDelay: `${0.05 * i + 0.12}s` }}
                                    >
                                        <EnrolledCourseCard
                                            course={course}
                                            progress={getProgress(course.id)}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default DashboardView;