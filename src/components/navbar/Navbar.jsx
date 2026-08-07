import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogIn } from 'lucide-react';

import LogoBar from "./LogoBar.jsx";
import DesktopMenu from "./DesktopMenu.jsx";
import MobileMenuPanel from "./MobileMenuPanel.jsx";
import useScrollPosition from "./hooks/useScrollPosition.js";
import useBodyScrollLock from "./hooks/useBodyScrollLock.js";
import {useAuth} from "../../hooks/useAuth.jsx";
import UserMenu from "./UserMenu.jsx";

export default function Navbar() {
    const scrollY = useScrollPosition();
    const [mobileOpen, setMobileOpen] = useState(false);
    const { user, logout, isAuthenticated, loading } = useAuth();
    const location = useLocation();
    const role = user?.roleName;

    useBodyScrollLock(mobileOpen);

    useEffect(() => setMobileOpen(false), [location.pathname]);

    const menuItems = [
        { path: '/Home', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/course', label: 'Courses' },
        { path: '/blog', label: 'Blog' },
    ];

    return (
        <>
            {/*<LogoBar scrollY={scrollY} />*/}

            <nav className="fixed top-0 w-full bg-white z-40 h-20 flex items-center">
                <div className="max-w-7xl mx-auto w-full flex justify-between px-4">
                    <Link to="/" className="md:hidden">
                        <img alt="" src="/deWave-logo.svg" className="h-6" />
                    </Link>

                    <DesktopMenu items={menuItems} />
                    <UserMenu />

                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2"
                    >
                        ☰
                    </button>
                </div>
            </nav>

            <MobileMenuPanel
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                items={menuItems}
                isAuthenticated={isAuthenticated}
                user={user}
                role={role}
                logout={logout}
            />
        </>
    );
}
