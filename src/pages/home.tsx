import React from "react";
import { emptyFormData, Form, type FormData } from "../components/form";
import { Hero } from "../components/hero";
import { Benefits } from "../components/benefits/benefits.component";
import { InteractiveMap } from "../components/map";

export const HomePage: React.FC = () => {
    const [formData, setFormData] = React.useState<FormData>(emptyFormData)

    const handleStreetSelect = (codigo: string) => {
        console.log('Calle seleccionada:', codigo);
        setFormData(prev => ({
            ...prev,
            streetCode: codigo
        }));
    };
    return (
        <div>
            <Hero />
            <Benefits />
            <InteractiveMap onStreetSelect={handleStreetSelect} />
            <Form formData={formData} setFormData={setFormData} />
        </div>
    );
}