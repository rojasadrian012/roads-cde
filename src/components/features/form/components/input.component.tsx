interface InputProps {
    id: string;
    name: string;
    type?: 'text' | 'email';
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    placeholder?: string;
    maxLength?: number;
    readOnly?: boolean;
    required?: boolean;
    error?: string;
    label: string;
    showCounter?: boolean;
}

export const Input: React.FC<InputProps> = ({
    id,
    name,
    type = 'text',
    value,
    onChange,
    onBlur,
    placeholder,
    maxLength,
    readOnly = false,
    required = false,
    error,
    label,
    showCounter = false,
}) => {
    return (
        <div className="space-y-1">
            <label htmlFor={id} className="block text-sm font-semibold">
                {label} {required && <span className="text-primary">*</span>}
            </label>
            <input
                type={type}
                id={readOnly ? undefined : id}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 ${readOnly
                        ? 'bg-gray-50 dark:bg-slate-900 cursor-not-allowed select-none pointer-events-none border-gray-200 dark:border-slate-600'
                        : `focus:outline-none focus:ring-2 focus:border-transparent bg-white dark:bg-slate-800 ${error
                            ? 'border-red-300 focus:ring-primary'
                            : 'border-gray-200 focus:ring-blue-500'
                        }`
                    }`}
                placeholder={placeholder}
                maxLength={maxLength}
                readOnly={readOnly}
                tabIndex={readOnly ? -1 : 0}
            />
            <div className="h-5">
                {error && (
                    <p className="text-primary text-xs">{error}</p>
                )}
            </div>
            {showCounter && maxLength && (
                <p className="text-gray-500 text-xs">
                    {value.length}/{maxLength} caracteres
                </p>
            )}
        </div>
    );
};