import { Calendar, Users, UserCheck, Clock } from "lucide-react";

const EventStatsCards = ({ events = [] }) => {
    const stats = {
        total: events.length,
        upcoming: events.filter(e => e.status === "upcoming").length,
        past: events.filter(e => e.status === "past").length,
        totalRegistered: events.reduce((sum, e) => sum + (e.registeredCount ?? 0), 0),
    };

    const cards = [
        { title: "Total Events", value: stats.total, icon: Calendar, color: "text-blue-500", bg: "bg-blue-50" },
        { title: "Upcoming", value: stats.upcoming, icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
        { title: "Past", value: stats.past, icon: UserCheck, color: "text-green-500", bg: "bg-green-50" },
        { title: "Total Registered", value: stats.totalRegistered, icon: Users, color: "text-purple-500", bg: "bg-purple-50" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {cards.map((card, i) => {
                const Icon = card.icon;
                return (
                    <div key={i} className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                            </div>
                            <div className={`${card.bg} p-3 rounded-lg`}>
                                <Icon className={`w-6 h-6 ${card.color}`} />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default EventStatsCards;