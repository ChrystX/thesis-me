import {Navigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.jsx";

export const ProtectedAdminRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return null;
    if (!user) return <Navigate to="/login" replace />;
    if (user.role !== "Admin") return <Navigate to="/home" replace />;

    return children;
};