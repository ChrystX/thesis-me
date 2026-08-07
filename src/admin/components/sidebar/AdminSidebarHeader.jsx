import { X } from "lucide-react";

export default function AdminSidebarHeader({ closeSidebar }) {
    return (
        <div className="flex items-center justify-between h-16 px-6 border-b">
            <h1 className="text-lg font-bold">Admin Panel</h1>

            <button onClick={closeSidebar} className="lg:hidden">
                <X className="w-5 h-5" />
            </button>
        </div>
    );
}