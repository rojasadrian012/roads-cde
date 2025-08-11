interface AlertProps {
    type?: 'info' | 'success' | 'warning' | 'error';
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export const Alert: React.FC<AlertProps> = ({
    type = 'info',
    title,
    children,
    className = '',
}) => {
    const typeClasses = {
        info: 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:bg-slate-500 border-blue-200 text-blue-700',
        success: 'bg-gradient-to-r from-green-50 to-emerald-50 dark:bg-slate-500 border-green-200 text-green-700',
        warning: 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:bg-slate-500 border-yellow-200 text-yellow-700',
        error: 'bg-gradient-to-r from-red-50 to-pink-50 dark:bg-slate-500 border-red-200 text-red-700',
    };

    const dotColors = {
        info: 'bg-blue-500',
        success: 'bg-green-500',
        warning: 'bg-yellow-500',
        error: 'bg-red-500',
    };

    return (
        <div className={`p-4 rounded-xl border ${typeClasses[type]} ${className}`}>
            <div className="flex items-center gap-3">
                <div className={`w-2 h-2 ${dotColors[type]} rounded-full`}></div>
                <div className="text-sm font-medium">
                    {title && <strong>{title}</strong>}
                    {children}
                </div>
            </div>
        </div>
    );
};