import React from "react";
import { Benefits } from "@/components/features/benefits";
import { emptyFormData, type FormData } from "@/components/features/form";
import { Hero } from "@/components/features/hero.component";
import { LazySection } from "@/components";
import { LazyForm, LazyInteractiveMap } from "@/components/features/lazy-components";
import { menuItems } from "@/data";

export const HomePage: React.FC = () => {
    const [formData, setFormData] = React.useState<FormData>(emptyFormData);
    const [foundStreetCode, setFoundStreetCode] = React.useState<string | undefined>();

    const handleStreetSelect = (codigo: string) => {
        setFormData(prev => ({
            ...prev,
            streetCode: codigo
        }));
        setFoundStreetCode(undefined);
    };

    return (
        <div>
            <Hero />
            <Benefits />

            <div id={menuItems[2].url.replace(/^#/, '')}>
                <LazySection
                    rootMargin="300px" // Inicia carga 300px antes
                    fallback={
                        <div className="flex flex-col justify-center items-center h-96">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                            <p className="mt-4 text-gray-600">Cargando mapa interactivo...</p>
                        </div>
                    }
                >
                    <LazyInteractiveMap
                        onStreetSelect={handleStreetSelect}
                        selectedStreetCode={formData.streetCode}
                        foundStreetCode={foundStreetCode}
                        setFoundStreetCode={setFoundStreetCode}
                    />
                </LazySection>
            </div>

            <div id={menuItems[3].url.replace(/^#/, '')}>
                <LazySection
                    rootMargin="200px"
                    fallback={
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                        </div>
                    }
                >
                    <LazyForm formData={formData} setFormData={setFormData} />
                </LazySection>
            </div>
        </div>
    );
};