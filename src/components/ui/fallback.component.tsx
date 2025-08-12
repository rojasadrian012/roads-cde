import type React from "react";

interface FallbackProps {
    text: string
}

export const Fallback: React.FC<FallbackProps> = ({ text }) => {
    return (
        <div className="flex flex-col justify-center items-center h-96">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600 dark:text-slate-300">{text}</p>
        </div>
    )
}