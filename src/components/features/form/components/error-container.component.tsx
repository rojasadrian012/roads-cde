import type React from "react";

interface ErrorContainerProps {
    error: string | undefined
}

export const ErrorContainer: React.FC<ErrorContainerProps> = ({ error }) => {
    return (
        <div className="h-3 md:h-5">
            {error && (
                <p className="text-primary text-xs">{error}</p>
            )}
        </div>
    )
}