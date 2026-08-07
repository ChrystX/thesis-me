import { X } from "lucide-react";

const BaseModal = ({ isOpen, title, children, onClose, maxWidth = "max-w-2xl", className = "", noPadding }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-black/40 flex items-center justify-center p-4 z-50">
            <div className={`bg-white rounded-xl shadow-2xl w-full ${maxWidth} ${className}`}>
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button onClick={onClose}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className= {noPadding ? "" : "p-5"} >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default BaseModal;