import { Link } from 'react-router-dom';
import { User, LogIn } from 'lucide-react';

export default function MobileAuthSection({
                                              isAuthenticated,
                                              user,
                                              onLogout,
                                              onNavigate,
                                          }) {
    const roleConfig = {
        admin: { path: '/admin/home', label: 'Admin Dashboard' },
        lecturer: { path: '/lecturer/home', label: 'Lecturer Panel' },
        student: { path: '/student/home', label: 'Student Dashboard' },
    };

    const userRole = user?.role?.toLowerCase();
    const roleInfo = roleConfig[userRole];

    return (
        <div className="border-t border-pink-400 pt-6 mt-8">
            {isAuthenticated ? (
                <div className="space-y-4">
                    <div className="flex items-center space-x-3 px-4 py-2">
                        <div className="w-10 h-10 bg-pink-700 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="font-medium">{user?.username}</p>
                            <p className="text-sm text-pink-200 capitalize">{user?.role}</p>
                        </div>
                    </div>

                    {roleInfo && (
                        <Link
                            to={roleInfo.path}
                            onClick={onNavigate}
                            className="block text-lg font-semibold px-4 py-3 rounded-md hover:bg-pink-700"
                        >
                            {roleInfo.label}
                        </Link>
                    )}

                    <button
                        onClick={() => {
                            onLogout();
                            onNavigate();
                        }}
                        className="w-full text-left text-lg font-semibold px-4 py-3 rounded-md hover:bg-pink-700 text-pink-200"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <Link
                    to="/login"
                    onClick={onNavigate}
                    className="flex items-center space-x-3 text-lg font-semibold px-4 py-3 rounded-md hover:bg-pink-700"
                >
                    <LogIn className="w-5 h-5" />
                    <span>Login</span>
                </Link>
            )}
        </div>
    );
}