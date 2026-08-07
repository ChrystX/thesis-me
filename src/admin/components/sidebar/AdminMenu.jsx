import { NavLink } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { adminMenu } from "../../config/adminMenu.js";

export default function AdminMenu({ closeSidebar }) {
    return (
        <nav className="mt-6 px-3 space-y-4 flex-1">
            {adminMenu.map((group) => (
                <div key={group.group}>
                    <p className="px-3 mb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        {group.group}
                    </p>
                    {group.items.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={closeSidebar}
                            className={({ isActive }) =>
                                `w-full flex items-center px-3 py-3 text-left text-sm font-medium rounded-lg transition-colors group ${
                                    isActive
                                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}`} />
                                    <span className="flex-1 font-medium">{item.label}</span>
                                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>
            ))}
        </nav>
    );
}