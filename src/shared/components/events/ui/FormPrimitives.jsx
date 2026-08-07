export function Section({ label, children }) {
    return (
        <div className="space-y-3">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</p>
            {children}
        </div>
    );
}

export function Field({ label, children }) {
    return (
        <div>
            <label className="block text-sm text-gray-500 mb-1">{label}</label>
            <div className="[&_input]:w-full [&_input]:border [&_input]:border-gray-200 [&_input]:rounded-lg [&_input]:px-3 [&_input]:py-2 [&_input]:text-sm [&_input]:outline-none [&_input]:focus:ring-2 [&_input]:focus:ring-black/10 [&_textarea]:w-full [&_textarea]:border [&_textarea]:border-gray-200 [&_textarea]:rounded-lg [&_textarea]:px-3 [&_textarea]:py-2 [&_textarea]:text-sm [&_textarea]:outline-none [&_textarea]:resize-none [&_textarea]:focus:ring-2 [&_textarea]:focus:ring-black/10">
                {children}
            </div>
        </div>
    );
}

export function ToggleGroup({ options, value, onChange }) {
    return (
        <div
            className="grid gap-2"
            style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}
        >
            {options.map((opt) => (
                <button
                    key={opt.value}
                    type="button"
                    onClick={() => onChange(opt.value)}
                    className={`py-2 text-sm rounded-lg border transition-all ${
                        value === opt.value
                            ? "bg-white border-gray-400 text-gray-900 font-medium"
                            : "bg-gray-50 border-gray-100 text-gray-400"
                    }`}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
}

export function CheckRow({ label, hint, checked, onChange }) {
    return (
        <label className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg cursor-pointer">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="w-4 h-4 accent-black"
            />
            <span className="text-sm text-gray-800">{label}</span>
            <span className="ml-auto text-xs text-gray-400">{hint}</span>
        </label>
    );
}

export function Divider() {
    return <hr className="border-gray-100" />;
}