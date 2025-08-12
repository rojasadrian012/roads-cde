import { ErrorContainer } from "./error-container.component";

interface TextareaProps {
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    maxLength?: number;
    minLength?: number;
    rows?: number;
    required?: boolean;
    error?: string;
    label: string;
}

export const Textarea: React.FC<TextareaProps> = ({
    id,
    name,
    value,
    onChange,
    onBlur,
    placeholder,
    maxLength,
    minLength,
    rows = 4,
    required = false,
    error,
    label,
}) => {
    return (
        <div className="space-y-0.25 md:space-y-1">
            <label htmlFor={id} className="block text-sm font-semibold">
                {label} {required && <span className="text-primary">*</span>}
            </label>
            <textarea
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                rows={rows}
                className={`w-full px-4 py-3 m-0 border rounded-xl focus:outline-none focus:ring-2 
                    focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-800 
                    resize-vertical ${error
                        ? 'border-red-300 focus:ring-primary'
                        : 'border-gray-200 focus:ring-blue-500'
                    }`}
                placeholder={placeholder}
                maxLength={maxLength}
            />

            
            {maxLength && (
                <p className="text-gray-500 text-xs mb-4">
                    {value.length}/{maxLength} caracteres{minLength && ` (mínimo ${minLength})`}
                </p>
            )}

            <ErrorContainer error={error} />
            
        </div>
    );
};
