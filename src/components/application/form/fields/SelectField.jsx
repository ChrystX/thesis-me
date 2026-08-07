import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function SelectField({ label, Icon, name, value, onChange, options }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (selectedValue) => {
        onChange({ target: { name, value: selectedValue } });
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col space-y-1 relative">
            <label className="text-sm text-gray-900 font-medium flex items-center">
                <Icon className="w-4 h-4 mr-2" /> {label}
            </label>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-transparent border-b border-gray-300 py-3 px-2 text-gray-900 cursor-pointer flex items-center justify-between hover:border-gray-500 transition-all duration-200 rounded-sm"
            >
                <span className={value ? 'text-gray-900' : 'text-gray-400'}>
                    {value || 'Select a course'}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </div>
            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                    <div className="absolute top-full left-0 right-0 z-20 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                        {options.map((option, index) => (
                            <div
                                key={option}
                                onClick={() => handleSelect(option)}
                                className={`px-4 py-3 cursor-pointer transition-colors duration-150 hover:bg-gray-50 ${value === option ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-700'} ${index !== options.length - 1 ? 'border-b border-gray-100' : ''}`}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}