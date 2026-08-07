export default function TextareaField({ label, Icon, name, value, onChange, placeholder, rows }) {
    return (
        <div className="flex flex-col space-y-1">
            <label className="text-sm text-gray-900 font-medium flex items-center">
                <Icon className="w-4 h-4 mr-2" /> {label}
            </label>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className="w-full bg-transparent border-b border-gray-300 py-3 px-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors duration-200 resize-none rounded-sm"
            />
        </div>
    );
}