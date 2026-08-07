const CardBackgroundImage = ({ src, alt }) => (
    <div className="absolute inset-0">
        <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onError={(e) => {
                e.currentTarget.src = "/no-image.png";
            }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800/60 to-transparent" />
    </div>
);

export default CardBackgroundImage;
