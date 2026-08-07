import {formatDuration} from "./utils.js";
import { Star, Clock } from "lucide-react";


const CourseMeta = ({ rating, duration }) => (
    <div className="flex items-center justify-between mb-2 text-xs text-gray-600">
        <div className="flex items-center gap-1">
            <Star size={14} fill="currentColor" className="text-yellow-400" />
            <span className="font-medium">
        {rating ? rating.toFixed(1) : 'N/A'}
      </span>
        </div>
        <div className="flex items-center gap-1">
            <Clock size={14} className="text-gray-500" />
            <span>{formatDuration(duration)}</span>
        </div>
    </div>
);

export default CourseMeta;