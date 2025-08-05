import React from "react";
import { emptyFormData, Form, type FormData } from "../components/form";
import { Hero } from "../components/hero";
import { Benefits } from "../components/benefits/benefits.component";
import { InteractiveMap } from "../components/map";

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