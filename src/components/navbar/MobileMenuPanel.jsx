import MobileNavLinks from './MobileNavLinks';
import MobileAuthSection from './MobileAuthSection';

export default function MobileMenuPanel({
                                            open,
                                            onClose,
                                            items,
                                            isAuthenticated,
                                            user,
                                            logout,
                                        }) {
    return (
        <div className="md:hidden">
            <div
                className={`fixed top-0 right-0 h-full w-80 max-w-sm shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
                    open ? 'translate-x-0' : 'translate-x-full'
                }`}
                style={{ backgroundColor: '#E4007C' }}
            >
                <div className="flex flex-col h-full p-6 space-y-6 text-white">
                    <MobileNavLinks items={items} onNavigate={onClose} />

                    <MobileAuthSection
                        isAuthenticated={isAuthenticated}
                        user={user}
                        onLogout={logout}
                        onNavigate={onClose}
                    />
                </div>
            </div>
        </div>
    );
}