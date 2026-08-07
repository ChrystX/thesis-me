import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, LogOut } from 'lucide-react';
import useBodyScrollLock from "../hooks/useBodyScrollLock.js";
import {useAuth} from "../../../hooks/useAuth.jsx";
import UserMenu from "../UserMenu.jsx";
import DesktopMenu from "../DesktopMenu.jsx";
import MobileMenuPanel from "../MobileMenuPanel.jsx";


export default function InstructorNavbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { user, logout, isAuthenticated } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const role = user?.roleName;

    useBodyScrollLock(mobileOpen);
    useEffect(() => setMobileOpen(false), [location.pathname]);

    const menuItems = [
        { path: '/instructor/dashboard', label: 'Dashboard' },
        { path: '/instructor/events', label: 'Events' },
    ];

    const isDashboard = location.pathname === '/instructor/dashboard';

    async function handleLogout() {
        await logout();
        navigate('/login');
    }

    return (
        <>
            <nav className="fixed top-0 w-full bg-white z-40 h-20 flex items-center border-b">
                <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-4">
                    <div className="flex items-center gap-3">
                        {!isDashboard && (
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
                            >
                                <ArrowLeft size={14} />
                                Back
                            </button>
                        )}

                        <Link to="/instructor/dashboard" className="font-semibold">
                            Instructor Panel
                        </Link>
                    </div>

                    <DesktopMenu items={menuItems} />

                    <div className="flex items-center gap-3">
                        <UserMenu />

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
                        >
                            <LogOut size={14} />
                            Logout
                        </button>

                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2"
                        >
                            ☰
                        </button>
                    </div>
                </div>
            </nav>

            <MobileMenuPanel
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                items={menuItems}
                isAuthenticated={isAuthenticated}
                user={user}
                role={role}
                logout={handleLogout}
            />
        </>
    );
}