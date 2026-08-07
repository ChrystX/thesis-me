import {AuthContext} from "../context/AuthContext.jsx";
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useInstructor} from "../hooks/useInstructor.js";
import {useCourses} from "../hooks/course/useCourses.js";
import InstructorCourseCard from "./components/InstructorCourseCard.jsx";
import InstructorProfileForm from "./InstructorProfileForm.jsx";
import {InstructorEventCalendar} from "../shared/components/events/calendar/InstructorEventCalendar.jsx";

const InstructorDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [showCourses, setShowCourses] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [isEditingProfile, setIsEditingProfile] = useState(false);

    const { instructor, loading: profileLoading, updateInstructor } = useInstructor(user?.id);
    const { courses: linkedCourses, loading: coursesLoading } = useCourses({
        instructorId: instructor?.id,
        skip: !instructor?.id
    });
    const { courses: allCourses, loading: allCoursesLoading } = useCourses({ activeOnly: true });


    const handleManageCourse = (course) => {
        const id = course.courseId ?? course.id;
        navigate(`/instructor/courses/${id}/sections`);
    };

    const handleSaveProfile = async (form) => {
        await updateInstructor(form);
        setIsEditingProfile(false);
    };

    return (
        <div className="w-full max-w-5xl mx-auto px-4 py-10 space-y-12">

            <div>
                <h1 className="text-2xl font-bold text-gray-900">Instructor Dashboard</h1>
                <p className="text-sm text-gray-500 mt-1">Manage your profile and courses</p>
            </div>

            {/* Profile Section */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">Your Profile</h2>
                        <p className="text-xs text-gray-400">This is what students see on your public page</p>
                    </div>
                    <button
                        onClick={() => setIsEditingProfile(e => !e)}
                        className="text-sm px-4 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
                    >
                        {isEditingProfile ? "Cancel" : "Edit Profile"}
                    </button>
                </div>

                {!isEditingProfile && !profileLoading && instructor && (
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center gap-4">
                        {instructor.imageUrl ? (
                            <img src={instructor.imageUrl} alt={instructor.name}
                                 className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                                <span className="text-pink-600 font-semibold text-sm">
                                    {instructor.name?.charAt(0) ?? "?"}
                                </span>
                            </div>
                        )}
                        <div>
                            <p className="text-sm font-semibold text-gray-900">{instructor.name}</p>
                            <p className="text-xs text-gray-500">{instructor.headline}</p>
                        </div>
                    </div>
                )}

                {/* Expanded form */}
                {isEditingProfile && (
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                        <InstructorProfileForm
                            instructor={instructor}
                            loading={profileLoading}
                            onSave={handleSaveProfile}
                        />
                    </div>
                )}
            </section>

            {/* Courses Section */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">Your Courses</h2>
                        <p className="text-xs text-gray-400">Courses you are linked to as an instructor</p>
                    </div>
                    <button onClick={() => setShowCourses(s => !s)} className="text-sm px-4 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition">
                        {showCourses ? "Hide" : `Show (${linkedCourses.length})`}
                    </button>
                </div>

                {showCourses && (
                    <>
                        {coursesLoading && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[...Array(3)].map((_, i) => <div key={i} className="animate-pulse bg-gray-100 rounded-xl h-48" />)}
                            </div>
                        )}

                        {/* Linked courses */}
                        {!coursesLoading && linkedCourses.length > 0 && (
                            <>
                                <p className="text-xs font-medium text-indigo-600 uppercase tracking-wide mb-2">Assigned to you</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                                    {linkedCourses.map(course => (
                                        <InstructorCourseCard key={course.courseId} course={course} onManage={handleManageCourse} />
                                    ))}
                                </div>
                            </>
                        )}

                        {!coursesLoading && linkedCourses.length === 0 && (
                            <div className="text-center py-6 border border-dashed border-gray-200 rounded-2xl text-gray-400 text-sm mb-6">
                                You have not been assigned to any courses yet.
                            </div>
                        )}

                        {/* All courses */}
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">All Courses</p>
                        {allCoursesLoading && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[...Array(3)].map((_, i) => <div key={i} className="animate-pulse bg-gray-100 rounded-xl h-48" />)}
                            </div>
                        )}
                        {!allCoursesLoading && (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {(showAll ? allCourses : allCourses.slice(0, 3)).map(course => (
                                        <InstructorCourseCard key={course.id} course={course} onManage={handleManageCourse} />
                                    ))}
                                </div>
                                {allCourses.length > 3 && (
                                    <button onClick={() => setShowAll(s => !s)} className="mt-4 w-full py-2 text-sm text-gray-500 border border-dashed border-gray-200 rounded-xl hover:bg-gray-50 transition">
                                        {showAll ? "Show less" : `Show ${allCourses.length - 3} more courses`}
                                    </button>
                                )}
                            </>
                        )}
                    </>
                )}
            </section>

            <section>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">Events</h2>
                        <p className="text-xs text-gray-400">Manage your events and attendance</p>
                    </div>
                    <button
                        onClick={() => navigate("/instructor/events")}
                        className="text-sm px-4 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
                    >
                        Manage Attendance
                    </button>
                </div>
                <InstructorEventCalendar />
            </section>
        </div>
    );
};

export default InstructorDashboard;