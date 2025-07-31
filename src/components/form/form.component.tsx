import React from "react";
import { emptyFormData, type FormData } from "./form.utils";

interface Props {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>
}

export const Form: React.FC<Props> = ({ setFormData, formData }) => {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.streetCode) {
            alert('Por favor, selecciona una calle sin nombre en el mapa');
            return;
        }

        // Usa tu URL real del formulario - cambia la parte final de 'viewform' a 'formResponse'
        const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdhDfTLPIHmSLXiGC3fCUoKLByBbwxgyk0iMNYLiQ_tD6_tCg/formResponse';

        const params = new URLSearchParams({
            'entry.1582708596': formData.streetCode,
            'entry.1487470156': formData.name,
            'entry.1900354476': formData.email,
            'entry.1320317034': formData.proposedName,
            'entry.1855274484': formData.reason
        });

        window.open(`${googleFormUrl}?${params.toString()}`, '_blank');

        setFormData(emptyFormData);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                    Proponer Nombre para Calle
                </h2>

                {formData.streetCode && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-600">
                            Calle seleccionada: <strong>Código {formData.streetCode}</strong>
                        </p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="streetCode" className="block text-sm font-medium text-gray-700 mb-1">
                            Código de Calle
                        </label>
                        <input
                            type="text"
                            id="streetCode"
                            name="streetCode"
                            value={formData.streetCode}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                            placeholder="Haz clic en una calle roja del mapa"
                            readOnly
                        />
                    </div>

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Tu Nombre
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ingresa tu nombre"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="tu@email.com"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="proposedName" className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre Propuesto para la Calle
                        </label>
                        <input
                            type="text"
                            id="proposedName"
                            name="proposedName"
                            value={formData.proposedName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ej: Calle de los Pioneros"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                            Razón o Justificación
                        </label>
                        <textarea
                            id="reason"
                            name="reason"
                            value={formData.reason}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                            placeholder="Explica por qué consideras que este nombre es apropiado para la calle..."
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!formData.streetCode}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {formData.streetCode ? 'Enviar Reporte' : 'Selecciona una calle primero'}
                    </button>
                </form>

                {!formData.streetCode && (
                    <p className="text-sm text-gray-500 mt-4 text-center">
                        💡 Haz clic en una <span className="text-red-500 font-semibold">calle roja</span> (sin nombre) en el mapa para seleccionarla
                    </p>
                )}
            </div>
        </div>
    )
}