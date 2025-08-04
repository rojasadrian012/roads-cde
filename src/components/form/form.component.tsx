import React, { useState } from "react";
import { emptyFormData, type FormData } from "./form.utils";
import { Clock, Lightbulb, MousePointer2 } from "lucide-react";

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

    const validateField = (name: string, value: string): string | undefined => {
        switch (name) {
            case 'streetCode':
                if (!value.trim()) {
                    return 'Por favor, selecciona una calle sin nombre en el mapa';
                }
                break;
            case 'name':
                if (!value.trim()) {
                    return 'El nombre es requerido';
                }
                if (value.trim().length < 2) {
                    return 'El nombre debe tener al menos 2 caracteres';
                }
                if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value.trim())) {
                    return 'El nombre solo puede contener letras y espacios';
                }
                break;
            case 'email':
                if (!value.trim()) {
                    return 'El correo electrónico es requerido';
                }
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value.trim())) {
                    return 'Por favor, ingresa un correo electrónico válido';
                }
                break;
            case 'proposedName':
                if (!value.trim()) {
                    return 'El nombre propuesto es requerido';
                }
                if (value.trim().length < 3) {
                    return 'El nombre propuesto debe tener al menos 3 caracteres';
                }
                if (value.trim().length > 100) {
                    return 'El nombre propuesto no puede exceder 100 caracteres';
                }
                break;
            case 'reason':
                if (!value.trim()) {
                    return 'La razón o justificación es requerida';
                }
                if (value.trim().length < 20) {
                    return 'La justificación debe tener al menos 20 caracteres';
                }
                if (value.trim().length > 1000) {
                    return 'La justificación no puede exceder 1000 caracteres';
                }
                break;
        }
        return undefined;
    };

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
            // Usa tu URL real del formulario - cambia la parte final de 'viewform' a 'formResponse'
            const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdhDfTLPIHmSLXiGC3fCUoKLByBbwxgyk0iMNYLiQ_tD6_tCg/formResponse';

            const params = new URLSearchParams({
                'entry.1582708596': formData.streetCode.trim(),
                'entry.1487470156': formData.name.trim(),
                'entry.1900354476': formData.email.trim().toLowerCase(),
                'entry.1320317034': formData.proposedName.trim(),
                'entry.1855274484': formData.reason.trim()
            });

            window.open(`${googleFormUrl}?${params.toString()}`, '_blank');

            // Mostrar mensaje de éxito
            alert('¡Propuesta enviada exitosamente! Gracias por tu contribución a la comunidad.');

            setFormData(emptyFormData);
            setErrors({});
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            alert('Hubo un error al enviar tu propuesta. Por favor, inténtalo de nuevo.');
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
        <div id="street-name" className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <div className="max-w-4xl mx-auto px-4 py-8 lg:py-16">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl lg:text-5xl lg:leading-tight font-bold text-gray-900 mb-4">
                        Proponer Nombre para <span className="text-primary">Calle</span>
                    </h1>
                    <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Ayuda a mejorar tu comunidad proponiendo nombres significativos para las calles sin denominar
                    </p>
                </div>

                {/* Form Container */}
                <div className="flex flex-wrap flex-col items-center justify-center gap-8 lg:flex-row lg:gap-20 lg:flex-nowrap">

                    {/* Form Section */}
                    <div className="w-full max-w-lg">
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100">

                                {/* Street Code Alert */}
                                {formData.streetCode && (
                                    <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            <p className="text-sm text-blue-700 font-medium">
                                                Calle seleccionada: <strong>Código {formData.streetCode}</strong>
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-6">
                                    {/* Street Code Input */}
                                    <div className="space-y-2">
                                        <label htmlFor="streetCode" className="block text-sm font-semibold text-gray-900">
                                            Código de Calle <span className="text-primary">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="streetCode"
                                            name="streetCode"
                                            value={formData.streetCode}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${errors.streetCode
                                                ? 'border-red-300 focus:ring-primary'
                                                : 'border-gray-200 focus:ring-blue-500'
                                                }`}
                                            placeholder="Haz clic en una calle roja del mapa"
                                            readOnly
                                        />
                                        {errors.streetCode && (
                                            <p className="text-primary text-xs mt-1">{errors.streetCode}</p>
                                        )}
                                    </div>

                                    {/* Name Input */}
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="block text-sm font-semibold text-gray-900">
                                            Tu Nombre <span className="text-primary">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 bg-white ${errors.name
                                                ? 'border-red-300 focus:ring-primary'
                                                : 'border-gray-200 focus:ring-blue-500'
                                                }`}
                                            placeholder="Ingresa tu nombre completo"
                                            maxLength={50}
                                        />
                                        {errors.name && (
                                            <p className="text-primary text-xs mt-1">{errors.name}</p>
                                        )}
                                    </div>

                                    {/* Email Input */}
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="block text-sm font-semibold text-gray-900">
                                            Correo Electrónico <span className="text-primary">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 bg-white ${errors.email
                                                ? 'border-red-300 focus:ring-primary'
                                                : 'border-gray-200 focus:ring-blue-500'
                                                }`}
                                            placeholder="tu@email.com"
                                            maxLength={100}
                                        />
                                        {errors.email && (
                                            <p className="text-primary text-xs mt-1">{errors.email}</p>
                                        )}
                                    </div>

                                    {/* Proposed Name Input */}
                                    <div className="space-y-2">
                                        <label htmlFor="proposedName" className="block text-sm font-semibold text-gray-900">
                                            Nombre Propuesto para la Calle <span className="text-primary">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="proposedName"
                                            name="proposedName"
                                            value={formData.proposedName}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 bg-white ${errors.proposedName
                                                ? 'border-red-300 focus:ring-primary'
                                                : 'border-gray-200 focus:ring-blue-500'
                                                }`}
                                            placeholder="Ej: Calle de los Pioneers"
                                            maxLength={100}
                                        />
                                        {errors.proposedName && (
                                            <p className="text-primary text-xs mt-1">{errors.proposedName}</p>
                                        )}
                                        <p className="text-gray-500 text-xs">
                                            {formData.proposedName.length}/100 caracteres
                                        </p>
                                    </div>

                                    {/* Reason Textarea */}
                                    <div className="space-y-2">
                                        <label htmlFor="reason" className="block text-sm font-semibold text-gray-900">
                                            Razón o Justificación <span className="text-primary">*</span>
                                        </label>
                                        <textarea
                                            id="reason"
                                            name="reason"
                                            value={formData.reason}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            rows={4}
                                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 bg-white resize-vertical ${errors.reason
                                                ? 'border-red-300 focus:ring-primary'
                                                : 'border-gray-200 focus:ring-blue-500'
                                                }`}
                                            placeholder="Explica por qué consideras que este nombre es apropiado para la calle. Comparte la historia, significado cultural o importancia de la propuesta..."
                                            maxLength={1000}
                                        />
                                        {errors.reason && (
                                            <p className="text-primary text-xs mt-1">{errors.reason}</p>
                                        )}
                                        <p className="text-gray-500 text-xs">
                                            {formData.reason.length}/1000 caracteres (mínimo 20)
                                        </p>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={!formData.streetCode || isSubmitting}
                                        className="w-full bg-gradient-to-r bg-primary text-white py-4 px-6 rounded-xl font-semibold hover:bg-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100 shadow-lg"
                                    >
                                        {isSubmitting
                                            ? 'Enviando...'
                                            : formData.streetCode
                                                ? 'Enviar Propuesta'
                                                : 'Selecciona una calle primero'
                                        }
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>



                    {/* Info Section */}
                    <div className="w-full max-w-lg lg:order-2">
                        <div className="space-y-8">

                            {/* Instructions Card */}
                            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-100">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                            <MousePointer2 className="text-primary w-4 h-4" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                            Cómo empezar
                                        </h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            Haz clic en una calle <span className="text-primary font-semibold">naranja</span> (sin nombre) en el mapa para seleccionarla y completar el formulario.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Tips Card */}
                            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-100">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                            <Lightbulb className="text-primary w-4 h-4" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                            Consejos para tu propuesta
                                        </h4>
                                        <ul className="text-gray-600 text-sm space-y-1">
                                            <li>• Considera la historia local</li>
                                            <li>• Honra figuras importantes</li>
                                            <li>• Piensa en la cultura del área</li>
                                            <li>• Evita nombres duplicados</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Process Card */}
                            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-100">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                            <Clock className="text-primary w-4 h-4" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                            Proceso de revisión
                                        </h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            Tu propuesta será evaluada por el comité municipal y la comunidad local antes de la aprobación final.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}