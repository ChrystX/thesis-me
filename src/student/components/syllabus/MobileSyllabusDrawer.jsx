export default function MobileSyllabusDrawer({ open, onClose, children }) {
    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 lg:hidden ${
                    open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                onClick={onClose}
            />

            {/* Drawer panel */}
            <div className={`fixed top-0 right-0 h-full w-80 z-50 shadow-2xl transition-transform duration-300 lg:hidden ${
                open ? "translate-x-0" : "translate-x-full"
            }`}>
                <div className="h-full flex flex-col bg-white">

                    {/* Drawer header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
                        <span className="text-sm font-bold text-gray-800">Course Contents</span>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition"
                        >
                            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Sidebar content injected here */}
                    <div className="flex-1 overflow-y-auto">
                        {children}
                    </div>

                </div>
            </div>
        </>
    );
}