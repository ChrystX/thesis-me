import { useState } from 'react';

export const TextInput = ({
                              label,
                              name,
                              type = 'text',
                              value,
                              onChange,
                              disabled,
                              placeholder,
                              autoComplete
                          }) => {
    const isPassword = type === 'password';
    const [show, setShow] = useState(false);

    const actualType = isPassword
        ? (show ? 'text' : 'password')
        : type;

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>

            <div className="relative">
                <input
                    type={actualType}
                    name={name}
                    value={value}
                    onChange={e => onChange(name, e.target.value)}
                    disabled={disabled}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 pr-12"
                    required
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShow(v => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                        tabIndex={-1}
                    >
                        {show ? 'Hide' : 'Show'}
                    </button>
                )}
            </div>
        </div>
    );
};
