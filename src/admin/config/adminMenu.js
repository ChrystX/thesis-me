import {
    LayoutDashboard,
    Users,
    BookOpen,
    FolderOpen,
    Settings,
    GraduationCap,
    UserCheck, CreditCard, AlertTriangle, Calendar
} from "lucide-react";

export const adminMenu = [
    {
        group: "Overview",
        items: [
            {
                label: "Dashboard",
                icon: LayoutDashboard,
                path: "/admin/home"
            }
        ]
    },
    {
        group: "User Management",
        items: [
            {
                label: "Users",
                icon: Users,
                path: "/admin/users"
            },
            {
                label: "Instructors",
                icon: GraduationCap,
                path: "/admin/instructors"
            },
            {
                label: "Students",
                icon: UserCheck,
                path: "/admin/students"
            }
        ]
    },
    {
        group: "Finance",
        items: [
            {
                label: "Payments",
                icon: CreditCard,
                path: "/admin/payments"
            },
            {
                label: "Enrollment Recovery",
                icon: AlertTriangle,
                path: "/admin/enrollment-recovery"
            }
        ]
    },
    {
        group: "Course Management",
        items: [
            {
                label: "Courses",
                icon: BookOpen,
                path: "/admin/courses"
            },
            {
                label: "Categories",
                icon: FolderOpen,
                path: "/admin/categories"
            },
            {
                label: "Events",
                icon: Calendar,
                path: "/admin/events"
            }
        ]
    },
    {
        group: "System",
        items: [
            {
                label: "Settings",
                icon: Settings,
                path: "/admin/settings"
            }
        ]
    }
];