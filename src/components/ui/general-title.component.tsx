import type React from "react";

interface GeneralTitleProps {
    title: string
    className?: string
}

export const GeneralTitle: React.FC<GeneralTitleProps> = ({ title, className }) => {
    return (
        <h2 className={`${className} text-primary text-4xl md:text-6xl md:leading-tight font-bold max-w-lg md:max-w-2xl pb-2.5 h-20`}>
            {title}
        </h2>
    )
}