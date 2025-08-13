import React from "react";
import { Benefits } from "@/components/features/benefits";
import { emptyFormData, Form, type FormData } from "@/components/features/form";
import { Hero } from "@/components/features/hero.component";
import { Container, GeneralTitle, LazySection } from "@/components";
import { LazyInteractiveMap } from "@/components/features/lazy-components";
import { SECTION_IDS } from "@/data";
import { Fallback } from "@/components/ui/fallback.component";

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
        <>
            <Hero />

            <Benefits />

            <Container
                id={SECTION_IDS.interactiveMap}
                className="pt-24 min-h-screen flex flex-col"
            >
                <GeneralTitle title="Mapa interactivo" />
                <div className="flex-1">
                    <LazySection
                        rootMargin="300px"
                        fallback={<Fallback text="Cargando mapa interactivo..." />}
                    >
                        <LazyInteractiveMap
                            onStreetSelect={handleStreetSelect}
                            selectedStreetCode={formData.streetCode}
                            foundStreetCode={foundStreetCode}
                            setFoundStreetCode={setFoundStreetCode}
                        />
                    </LazySection>
                </div>
            </Container>

            <Container
                id={SECTION_IDS.streetName}
                className="pt-24 md:pt-0 min-h-screen"
            >
                <Form formData={formData} setFormData={setFormData} />
            </Container>
        </>
    );
};