import React from "react";
import { Form } from "../form";
import { InteractiveMap } from "../map";
import { emptyFormData, type FormData } from "../form";




export const AppLayout: React.FC = () => {
    const [formData, setFormData] = React.useState<FormData>(emptyFormData)

    const handleStreetSelect = (codigo: string) => {
        console.log('Calle seleccionada:', codigo);
        setFormData(prev => ({
            ...prev,
            streetCode: codigo
        }));
    };

    return (
        <div className='bg-gray-100 min-h-screen'>
            <InteractiveMap onStreetSelect={handleStreetSelect} />
            <Form formData={formData} setFormData={setFormData} />
        </div>
    )
}