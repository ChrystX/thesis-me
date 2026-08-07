import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/sidebar/AdminSidebar";

export default function AdminLayout() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <AdminSidebar />

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 p-6">
                <Outlet />
            </main>
        </div>
    );
}