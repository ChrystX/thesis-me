import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import {useAuth} from "../../hooks/useAuth.jsx";
import useOutsideClick from "./hooks/useOutsideClick.js";

export default function UserMenu() {
    const { user, logout, isAuthenticated, loading } = useAuth();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const role = user?.roleName;  // was user?.role

    const roleConfig = {
        admin:      { path: '/admin/users',          label: 'Admin Dashboard' },
        instructor: { path: '/instructor/dashboard', label: 'Instructor Panel' },
        student:    { path: '/student/dashboard',    label: 'Student Dashboard' },
    };


    useOutsideClick(ref, () => setOpen(false));

    if (loading) return null;

    return (
        <div ref={ref} className="hidden md:flex items-center ml-auto relative">
            {!isAuthenticated ? (
                <>
                    <button onClick={() => setOpen(!open)} className="p-2 text-gray-600">
                        <User className="w-5 h-5" />
                    </button>

                    {open && (
                        <div className="absolute right-0 mt-2 w-48 bg-white shadow border rounded">
                            <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">
                                Login
                            </Link>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <button onClick={() => setOpen(!open)} className="flex items-center space-x-2">
                        <User className="w-5 h-5" />
                        <span>{user?.username}</span>
                    </button>

                    {open && (
                        <div className="absolute right-0 mt-2 w-48 bg-white shadow border rounded">
                            {roleConfig[role] && (
                                <Link
                                    to={roleConfig[role].path}
                                    className="block px-4 py-2 hover:bg-gray-100"
                                >
                                    {roleConfig[role].label}
                                </Link>
                            )}

                            <button
                                onClick={logout}
                                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
