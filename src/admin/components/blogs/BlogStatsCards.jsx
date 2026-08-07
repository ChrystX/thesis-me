import { FileText, CheckCircle, Clock, Eye } from "lucide-react";

const BlogStatsCards = ({ blogs = [] }) => {
    const stats = {
        total: blogs.length,
        published: blogs.filter(b => b.status === "published").length,
        drafts: blogs.filter(b => b.status !== "published").length,
        totalViews: blogs.reduce((sum, b) => sum + (b.viewCount ?? 0), 0),
    };

    const cards = [
        { title: "Total Posts",  value: stats.total,      icon: FileText,     color: "text-blue-500"   },
        { title: "Published",    value: stats.published,  icon: CheckCircle,  color: "text-green-500"  },
        { title: "Drafts",       value: stats.drafts,     icon: Clock,        color: "text-yellow-500" },
        { title: "Total Views",  value: stats.totalViews, icon: Eye,          color: "text-purple-500" },
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

export default BlogStatsCards;