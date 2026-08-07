import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";

const ProtectedStudentRoute = () => {
    const { user, loading } = useAuth();

    if (loading) return null;
    if (!user) return <Navigate to="/login" replace />;
    if (user.roleName !== "student") return <Navigate to="/home" replace />;

    return <Outlet />;
};

export default ProtectedStudentRoute;