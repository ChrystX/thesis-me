import React from "react";
import { Users, UserCheck, MailCheck, Shield, GraduationCap } from "lucide-react";

const UserStatsCards = ({ users = [] }) => {
    const stats = {
        total: users.length,
        active: users.filter(u => u.isActive).length,
        verified: users.filter(u => u.isEmailVerified).length,
        admins: users.filter(u => u.role?.name === "Admin").length,
        instructors: users.filter(u => u.role?.name === "Instructor").length,
        students: users.filter(u => u.role?.name === "Student").length
    };

    const cards = [
        {
            title: "Total Users",
            value: stats.total,
            icon: Users,
            color: "text-blue-500"
        },
        {
            title: "Active Users",
            value: stats.active,
            icon: UserCheck,
            color: "text-green-500"
        },
        {
            title: "Verified Emails",
            value: stats.verified,
            icon: MailCheck,
            color: "text-purple-500"
        },
        {
            title: "Admins",
            value: stats.admins,
            icon: Shield,
            color: "text-red-500"
        },
        {
            title: "Instructors",
            value: stats.instructors,
            icon: Shield,
            color: "text-blue-500"
        },
        {
            title: "Students",
            value: stats.students,
            icon: GraduationCap,
            color: "text-yellow-500"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
            {cards.map((card, index) => {
                const Icon = card.icon;
                return (
                    <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    {card.title}
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {card.value}
                                </p>
                            </div>
                            <Icon className={`w-8 h-8 ${card.color}`} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default UserStatsCards;