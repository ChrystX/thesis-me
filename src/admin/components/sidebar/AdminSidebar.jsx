// AdminSidebar.jsx
import { useState } from "react";
import AdminSidebarHeader from "./AdminSidebarHeader";
import AdminUserInfo from "./AdminUserInfo";
import AdminMenu from "./AdminMenu";
import AdminSidebarFooter from "./AdminSidebarFooter";
import LogoutModal from "./LogoutModal";
import {useAuth} from "../../../hooks/useAuth.jsx";

export default function AdminSidebar() {
    const [open, setOpen] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const { logout } = useAuth(); // same as UserMenu

    return (
        <>
            <aside className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform ${
                open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            }`}>
                <AdminSidebarHeader closeSidebar={() => setOpen(false)} />
                <AdminUserInfo />
                <AdminMenu closeSidebar={() => setOpen(false)} />
                <AdminSidebarFooter openLogout={() => setShowLogout(true)} />
            </aside>

            {showLogout && (
                <LogoutModal
                    close={() => setShowLogout(false)}
                    logout={logout} // pass it down just like Navbar passes to MobileMenuPanel
                />
            )}
        </>
    );
}