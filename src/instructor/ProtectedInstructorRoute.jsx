import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.jsx";
import InstructorNavbar from "../components/navbar/instructor/InstructorNavbar.jsx";

const ProtectedInstructorRoute = () => {
    const { user, loading } = useAuth();

    if (loading) return null;
    if (!user) return <Navigate to="/login" replace />;
    if (user.roleName !== "instructor") return <Navigate to="/home" replace />;

    return (
        <div className="pt-20">
            <InstructorNavbar />
            <Outlet />
        </div>
    );
};

export default ProtectedInstructorRoute;