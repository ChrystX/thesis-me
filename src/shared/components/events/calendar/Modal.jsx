export function Modal({ children, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
             onClick={onClose}>
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative bg-white rounded-xl border border-gray-200 w-full max-w-lg max-h-[90vh] overflow-y-auto p-6"
                 onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}