import React from "react";
import { Layers, CheckCircle, XCircle } from "lucide-react";

const SectionStatsCards = ({ sections = [] }) => {
    const stats = {
        total: sections.length,
        active: sections.filter(s => s.isActive).length,
        inactive: sections.filter(s => !s.isActive).length,
    };

    const cards = [
        {
            title: "Total Sections",
            value: stats.total,
            icon: Layers,
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

export default SectionStatsCards;