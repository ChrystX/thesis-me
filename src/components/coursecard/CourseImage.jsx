import {getImageUrl} from "./utils.js";
import {useState} from "react";

const CourseImage = ({ image, title, onClick }) => {
    const [error, setError] = useState(false);
    const imageUrl = getImageUrl(image) || '/no-image.png';

    return (
        <div className="relative cursor-pointer" onClick={onClick}>
            <img
                src={error ? '/no-image.png' : imageUrl}
                alt={title}
                onError={() => setError(true)}
                className="w-full h-28 sm:h-36 object-cover hover:opacity-90 transition-opacity"
                loading="lazy"
            />
        </div>
    );
};

export default CourseImage;