interface FormCardProps {
    children: React.ReactNode;
    className?: string;
}

export const FormCard: React.FC<FormCardProps> = ({ children, className = '' }) => {
    return (
        <div className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 ${className}`}>
            {children}
        </div>
    );
};