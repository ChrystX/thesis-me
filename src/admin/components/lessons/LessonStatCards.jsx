import React from "react";
import { BookOpen, FileText, ArrowUpDown } from "lucide-react";

const LessonStatsCards = ({ lessons = [] }) => {
    const stats = {
        total: lessons.length,
        withDescription: lessons.filter(l => l.description && l.description.trim() !== "").length,
        withoutDescription: lessons.filter(l => !l.description || l.description.trim() === "").length,
    };

    const cards = [
        {
            title: "Total Lessons",
            value: stats.total,
            icon: BookOpen,
            color: "text-blue-500"
        },
        {
            title: "With Description",
            value: stats.withDescription,
            icon: FileText,
            color: "text-green-500"
        },
        {
            title: "No Description",
            value: stats.withoutDescription,
            icon: ArrowUpDown,
            color: "text-yellow-500"
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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

export default LessonStatsCards;