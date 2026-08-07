import { useNavigate } from "react-router-dom";
import CardBackgroundImage from "./CardBackgroundImage";
import {getImageUrl} from "./utils/imageUtils.js";

const SweeperCard = ({ course }) => {
    const navigate = useNavigate();
    const imageUrl = getImageUrl(course.image) || "/no-image.png";

    return (
        <div
            onClick={() => navigate(`/course/${course.id}`)}
            className="relative w-full h-24 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700
                       rounded-xl overflow-hidden cursor-pointer group transition-all duration-300
                       hover:shadow-lg hover:shadow-slate-500/20 hover:-translate-y-2"
        >
            <div className="relative z-10 h-full flex items-center px-4">
                <div className="flex-1 min-w-0 pr-4">
                    <h3 className="text-white font-semibold text-sm truncate mb-1">
                        {course.title}
                    </h3>
                    <p className="text-slate-400 text-xs opacity-80 group-hover:opacity-100 transition-opacity">
                        Click to explore
                    </p>
                </div>
            </div>

            <CardBackgroundImage src={imageUrl} alt={course.title} />

            <div className="absolute inset-0 rounded-xl border border-transparent
                            group-hover:border-slate-500/30 transition-colors duration-300" />
        </div>
    );
};

export default SweeperCard;
