import { BookOpen, Users, Award } from 'lucide-react';

const BlogHeroSection = ({ totalCount }) => (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#e91e63] via-[#f06292] to-[#e91e63]">
        <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
        </div>

        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-32 right-20 w-16 h-16 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }} />

        <div className="relative max-w-7xl mx-auto px-6 py-20">
            <div className="text-center text-white">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fadeIn">
                    <BookOpen size={20} />
                    <span className="text-sm font-medium">Content Hub</span>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-white to-gray-200 bg-clip-text text-transparent leading-tight md:leading-snug animate-slideInUp">
                    Stories & Insights
                </h1>

                <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed animate-slideInUp" style={{ animationDelay: '0.2s' }}>
                    Discover expert insights and practical tutorials from our community
                </p>

                <div className="flex items-center justify-center gap-8 text-sm animate-slideInUp" style={{ animationDelay: '0.4s' }}>
                    <div className="flex items-center gap-2">
                        <BookOpen size={18} />
                        <span>{totalCount} Articles</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users size={18} />
                        <span>Expert Authors</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Award size={18} />
                        <span>Quality Content</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <svg className="relative block w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="rgb(249, 250, 251)" />
            </svg>
        </div>
    </div>
);

export default BlogHeroSection;