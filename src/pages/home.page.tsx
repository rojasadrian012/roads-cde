import React from "react";
import { Benefits } from "@/components/features/benefits";
import { InteractiveMap } from "@/components/features/interactive-map";
import { emptyFormData, Form, type FormData } from "@/components/features/form";
import { Hero } from "@/components/features/hero.component";

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
            <InteractiveMap
                onStreetSelect={handleStreetSelect}
                selectedStreetCode={formData.streetCode}
                foundStreetCode={foundStreetCode}
                setFoundStreetCode={setFoundStreetCode}
            />
            <Form formData={formData} setFormData={setFormData} />
        </div>
    );
};