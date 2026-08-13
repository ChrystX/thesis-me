import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";
// Public pages
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/LoginPage.jsx";
import LessonEditorPage from "./pages/LessonEditorPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";

// Admin pages
import UsersPage from "./admin/pages/dashboards/UsersPage.jsx";
import CoursesPage from "./admin/pages/dashboards/CoursesPage.jsx";
import SectionsPage from "./admin/pages/dashboards/SectionsPage.jsx";
import LessonsPage from "./admin/pages/dashboards/LessonsPage.jsx";
import ProtectedInstructorRoute from "./instructor/ProtectedInstructorRoute.jsx";
import InstructorDashboard from "./instructor/InstructorDashboard.jsx";
import InstructorSectionsPage from "./instructor/pages/InstructorSectionsPage.jsx";
import InstructorLessonsPage from "./instructor/pages/InstructorLessonsPage.jsx";
import {ProtectedAdminRoute} from "./admin/components/ProtectedAdminRoute.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import AdminLayout from "./admin/layout/AdminLayout.jsx";

// Student pages
import StudentDashboardPage from "./student/pages/StudentDashboardPage.jsx";
import ProtectedStudentRoute from "./student/ProtectedStudentRoute.jsx";
import LessonPage from "./student/pages/LessonPage.jsx";
import CourseOfferingPage from "./admin/pages/input/CourseOfferingPage.jsx";
import CategoriesPage from "./admin/pages/dashboards/CategoriesPage.jsx";
import PaymentsPage from "./admin/pages/dashboards/PaymentsPage.jsx";
import EnrollmentRecoveryPage from "./admin/pages/dashboards/EnrollmentRecoveryPage.jsx";
import CoursePage from "./pages/CoursePage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import BlogDetail from "./pages/BlogDetailPage.jsx";
import EventsPage from "./admin/pages/dashboards/EventsPage.jsx";
import BlogDetailPage from "./pages/BlogDetailPage.jsx";
import CourseDetailPage from "./pages/CourseDetailPage.jsx";
import PublicLayout from "./layout/PublicLayout.jsx";
import ExamEditorPage from "./pages/ExamEditorPage.jsx";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public */}
                    <Route element={<PublicLayout />}>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/course" element={<CoursePage />} />
                        <Route path="/course/:courseId" element={<CourseDetailPage />} />
                        <Route path="/blog" element={<BlogPage />} />
                        <Route path="/blog/:blogId" element={<BlogDetailPage />} />
                        <Route path="/reset-password" element={<ResetPasswordPage />} />
                    </Route>


                    {/* Admin */}
                    {/*<Route path="/admin/*" element={*/}
                    {/*    <ProtectedAdminRoute>*/}
                    {/*        <AdminLayout />   /!* 👈 layout with sidebar *!/*/}
                    {/*    </ProtectedAdminRoute>*/}
                    {/*}>*/}
                    {/*    <Route path="users" element={<UsersPage />} />*/}
                    {/*    <Route path="courses" element={<CoursesPage />} />*/}
                    {/*    <Route path="courses/:courseId/sections" element={<SectionsPage />} />*/}
                    {/*    <Route path="courses/:courseId/sections/:sectionId/lessons" element={<LessonsPage />} />*/}
                    {/*</Route>*/}

                    {/* Admin */}
                    <Route path="/admin/*" element={
                        <ProtectedAdminRoute>
                            <AdminLayout />
                        </ProtectedAdminRoute>
                    }>
                        <Route path="users" element={<UsersPage />} />
                        <Route path="courses" element={<CoursesPage />} />
                        <Route path="courses/:courseId/offering" element={<CourseOfferingPage />} />
                        <Route path="courses/:courseId/sections" element={<SectionsPage />} />
                        <Route path="courses/:courseId/sections/:sectionId/lessons" element={<LessonsPage />} />
                        <Route path="categories" element={<CategoriesPage />} />
                        <Route path="payments" element={<PaymentsPage />} />
                        <Route path="enrollment-recovery" element={<EnrollmentRecoveryPage />} />
                        <Route path="events" element={<EventsPage />} />
                    </Route>

                    <Route path="/instructor" element={<ProtectedInstructorRoute />}>
                        <Route path="dashboard" element={<InstructorDashboard />} />
                        <Route path="courses/:courseId/sections" element={<InstructorSectionsPage />} />
                        <Route path="courses/:courseId/sections/:sectionId/lessons" element={<InstructorLessonsPage />} />
                        <Route path="courses/:courseId/sections/:sectionId/lessons/:lessonId/editor" element={<LessonEditorPage />} />
                        <Route path="events" element={<EventsPage />} />
                        <Route path="courses/:courseId/sections/:sectionId/lessons/:lessonId/exam" element={<ExamEditorPage />} />
                    </Route>

                    <Route path="/student/*" element={<ProtectedStudentRoute />}>
                        <Route path="dashboard" element={<StudentDashboardPage />} />
                        <Route path="course/:courseId/lesson/:lessonId" element={<LessonPage />} />
                    </Route>

                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;