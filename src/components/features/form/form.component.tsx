import React, { useState } from "react";
import { Container } from "@/components/ui";
import { emptyFormData, type FormData } from "./form.utils";
import { validateField } from "./validate-field";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Alert, Button, FormCard, Input, Textarea } from "./components";


interface Props {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>
}

interface ValidationErrors {
    streetCode?: string;
    name?: string;
    email?: string;
    proposedName?: string;
    reason?: string;
}

export const Form: React.FC<Props> = ({ setFormData, formData }) => {
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: ValidationErrors = {};

        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key as keyof FormData]);
            if (error) {
                newErrors[key as keyof ValidationErrors] = error;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isSubmitting) return;

        if (!validateForm()) {
            // Enfocar el primer campo con error
            const firstErrorField = Object.keys(errors)[0];
            if (firstErrorField) {
                const element = document.getElementById(firstErrorField);
                element?.focus();
            }
            return;
        }

        setIsSubmitting(true);

        try {
            // Insertar datos en Supabase
            const { error } = await supabase
                .from('streets')
                .insert([
                    {
                        street_code: formData.streetCode.trim(),
                        full_name: formData.name.trim(),
                        email: formData.email.trim().toLowerCase(),
                        street_name: formData.proposedName.trim(),
                        reason: formData.reason.trim()
                    }
                ])

            if (error) {
                throw error;
            }

            // Mostrar mensaje de éxito
            toast.success('¡Propuesta enviada exitosamente! Gracias por tu contribución a la comunidad.');

            // Limpiar el formulario
            setFormData(emptyFormData);
            setErrors({});

        } catch (error: any) {
            console.error('Error al enviar el formulario:', error);

            // Mostrar mensaje de error más específico
            if (error.message) {
                toast(`Hubo un error al enviar tu propuesta: ${error.message}. Por favor, inténtalo de nuevo.`);
            } else {
                toast('Hubo un error al enviar tu propuesta. Por favor, inténtalo de nuevo.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Limpiar error del campo cuando el usuario empiece a escribir
        if (errors[name as keyof ValidationErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const error = validateField(name, value);

        if (error) {
            setErrors(prev => ({
                ...prev,
                [name]: error
            }));
        }
    };

    return (
        <Container className="min-h-dvh flex flex-col items-center justify-around md:flex-row pt-24 md:pt-0">
            <div className="text-center max-w-md py-10 md:px-5">
                <h1 className="text-3xl lg:text-5xl lg:leading-tight font-bold mb-4">
                    Proponer nombre para <span className="text-primary">calle</span>
                </h1>
                <p className="text-base lg:text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                    Ayuda a mejorar tu comunidad proponiendo nombres significativos para las calles sin denominar
                </p>
            </div>

            <div className="w-full md:min-w-lg flex flex-wrap flex-col items-center justify-center gap-8 lg:flex-row lg:gap-20 lg:flex-nowrap">
                <div className="w-full max-w-3xl">
                    <form onSubmit={handleSubmit} noValidate>
                        <FormCard className="">
                            {/* Street Code Alert */}

                            {formData.streetCode ? (
                                <Alert type="success" className="mb-4">
                                    Calle seleccionada: <strong>Código {formData.streetCode}</strong>
                                </Alert>
                            ) : (
                                <Alert type="info" className="mb-4">
                                    <strong>Por favor, selecciona una calle</strong> haciendo clic sobre una de las calles en el mapa.
                                </Alert>
                            )}

                            <div className="">
                                {/* Componentes Input */}
                                <Input
                                    id="streetCode"
                                    name="streetCode"
                                    value={formData.streetCode}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    label="Código de calle"
                                    placeholder="Haz clic en una calle naranja del mapa"
                                    readOnly
                                    required
                                    error={errors.streetCode}
                                />

                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    label="Tu nombre"
                                    placeholder="Ingresa tu nombre completo"
                                    maxLength={50}
                                    required
                                    error={errors.name}
                                />

                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    label="Correo electrónico"
                                    placeholder="tu@email.com"
                                    maxLength={100}
                                    required
                                    error={errors.email}
                                />

                                <Input
                                    id="proposedName"
                                    name="proposedName"
                                    value={formData.proposedName}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    label="Nombre propuesto para la calle"
                                    placeholder="Ej: Calle de los Pioneers"
                                    maxLength={100}
                                    required
                                    error={errors.proposedName}
                                    showCounter
                                />

                                <Textarea
                                    id="reason"
                                    name="reason"
                                    value={formData.reason}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    label="Razón o justificación"
                                    placeholder="Explica por qué consideras que este nombre es apropiado para la calle..."
                                    maxLength={1000}
                                    minLength={20}
                                    required
                                    error={errors.reason}
                                />

                                <Button
                                    type="submit"
                                    disabled={!formData.streetCode}
                                    loading={isSubmitting}
                                >
                                    {isSubmitting
                                        ? 'Enviando...'
                                        : formData.streetCode
                                            ? 'Enviar propuesta'
                                            : 'Selecciona una calle primero'
                                    }
                                </Button>
                            </div>
                        </FormCard>
                    </form>
                </div>
            </div>
        </Container>
    );
}