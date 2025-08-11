interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({
    type = 'button',
    disabled = false,
    loading = false,
    onClick,
    children,
    variant = 'primary',
    className = '',
}) => {
    const baseClasses = "w-full py-4 px-6 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 transform shadow-lg";

    const variantClasses = {
        primary: "bg-gradient-to-r bg-primary text-white hover:bg-primary focus:ring-blue-500 hover:scale-[1.02]",
        secondary: "bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-slate-600",
    };

    const disabledClasses = "disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:hover:scale-100";

    return (
        <button
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`}
        >
            {loading ? 'Cargando...' : children}
        </button>
    );
};
