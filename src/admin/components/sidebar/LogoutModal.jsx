export default function LogoutModal({ close, logout }) {
    return (
        // Backdrop
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            {/* Modal box */}
            <div className="bg-white rounded-xl shadow-xl p-6 w-80 flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-gray-800">Confirm Logout</h2>
                <p className="text-sm text-gray-500">Are you sure you want to logout?</p>

                <div className="flex gap-3 justify-end">
                    <button
                        onClick={close}
                        className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => { logout(); close(); }}
                        className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}