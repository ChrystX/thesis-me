export default function LogoBar({ scrollY }) {
    const maxLogoScroll = 100;
    const logoOpacity = Math.max(0, 1 - scrollY / maxLogoScroll);
    const logoHeight = Math.max(0, 48 - scrollY / 2);

    return (
        <div
            className="hidden md:flex w-full z-50 justify-center items-center fixed top-0 left-0 transition-all duration-300 bg-white"
            style={{
                height: `${logoHeight}px`,
                opacity: logoOpacity,
                pointerEvents: logoOpacity === 0 ? 'none' : 'auto',
            }}
        >
            <img src="/deWave-logo.svg" alt="Logo" className="h-6 opacity-80" />
        </div>
    )
}