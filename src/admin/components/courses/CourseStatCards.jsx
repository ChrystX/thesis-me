// CourseStatsCards.jsx
import { BookOpen, CheckCircle, XCircle, Banknote } from "lucide-react";
import {formatRupiah} from "./utils/currency.js";

const CourseStatsCards = ({ courses = [] }) => {
    const stats = {
        total: courses.length,
        active: courses.filter(c => c.isActive).length,
        inactive: courses.filter(c => !c.isActive).length,
        avgPrice: courses.length
            ? courses.reduce((sum, c) => sum + (c.price ?? 0), 0) / courses.length
            : 0,
    };

    const cards = [
        {
            title: "Total Courses",
            value: stats.total,
            icon: BookOpen,
            color: "text-blue-500"
        },
        {
            title: "Active",
            value: stats.active,
            icon: CheckCircle,
            color: "text-green-500"
        },
        {
            title: "Inactive",
            value: stats.inactive,
            icon: XCircle,
            color: "text-red-500"
        },
        {
            title: "Avg. Price",
            value: formatRupiah(stats.avgPrice),
            icon: Banknote,
            color: "text-yellow-500"
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {cards.map((card, index) => {
                const Icon = card.icon;
                return (
                    <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                            </div>
                            <Icon className={`w-8 h-8 ${card.color}`} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CourseStatsCards;