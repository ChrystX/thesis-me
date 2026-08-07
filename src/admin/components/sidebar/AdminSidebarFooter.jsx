export default function AdminSidebarFooter({ openLogout }) {
    return (
        <div className="p-4 border-t">
            <button
                onClick={openLogout}
                className="w-full bg-red-500 text-white py-2 rounded-lg"
            >
                Logout
            </button>
        </div>
    );
}