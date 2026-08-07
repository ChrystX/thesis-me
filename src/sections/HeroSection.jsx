const HeroSection = () => {
    return (
        <section
            className="w-full min-h-screen flex items-center justify-center text-center relative"
            style={{
                backgroundImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0.75), rgba(0,0,0,0.8)), url('https://i.imgur.com/17Pej2Z.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="max-w-4xl px-4 space-y-6">
                <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-light">
                    Welcome to{" "}
                    <span className="text-[#e91e63] block sm:inline">
            deWave Academy
          </span>
                </h1>

                <p className="text-gray-200 max-w-xl mx-auto">
                    Master the art of beauty with professional training in massage,
                    lashes, nails, makeup, and waxing.
                </p>

                <button className="px-8 py-4 bg-[#e91e63] text-white rounded-full hover:bg-[#c2185b] transition cursor-pointer">
                    Start Your Journey
                </button>
            </div>
        </section>
    );
};

export default HeroSection;
