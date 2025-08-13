import React from "react";

export const useDarkMode = (): { isDarkMode: boolean } => {
    const [isDarkMode, setIsDarkMode] = React.useState(() => {
        // Inicialización segura
        if (typeof document !== 'undefined') {
            return document.body.classList.contains("dark");
        }
        return false;
    });

    React.useEffect(() => {
        const checkDarkMode = () => document.body.classList.contains("dark");

        // Verificar estado inicial
        const initialDarkMode = checkDarkMode();
        setIsDarkMode(initialDarkMode);

        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === "class") {
                    const darkMode = checkDarkMode();
                    console.log("Dark mode detectado:", darkMode);

                    setIsDarkMode(prevState => {
                        if (prevState !== darkMode) {
                            console.log("Actualizando estado de", prevState, "a", darkMode);
                            return darkMode;
                        }
                        return prevState;
                    });
                }
            });
        });

        mutationObserver.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => {
            mutationObserver.disconnect();
        };
    }, []);

    return { isDarkMode };
};