// App.tsx
import React, { useState } from 'react';
import './App.css';
import { Map } from './components/map/map.component';


interface FormData {
  codigo: string;
  nombre: string;
  correo: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    codigo: '',
    nombre: '',
    correo: ''
  });

  // Esta función recibe el código de la calle clickeada
  const handleStreetSelect = (codigo: string) => {
    console.log('Calle seleccionada:', codigo);
    setFormData(prev => ({
      ...prev,
      codigo: codigo
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.codigo) {
      alert('Por favor, selecciona una calle sin nombre en el mapa');
      return;
    }

    // URL de tu Google Form (reemplaza con tu URL real)
    const googleFormUrl = 'https://docs.google.com/forms/d/e/TU_FORM_ID/formResponse';

    // Parámetros para Google Forms (reemplaza con tus entry IDs reales)
    const params = new URLSearchParams({
      'entry.123456789': formData.codigo,    // Entry ID para código
      'entry.987654321': formData.nombre,    // Entry ID para nombre  
      'entry.456789123': formData.correo     // Entry ID para correo
    });

    // Abrir Google Form precompletado
    window.open(`${googleFormUrl}?${params.toString()}`, '_blank');

    // Limpiar formulario
    setFormData({
      codigo: '',
      nombre: '',
      correo: ''
    });
  };

  return (
    <div className='bg-gray-100 min-h-screen'>
      {/* Pasar la función handleStreetSelect al componente Map */}
      <Map onStreetSelect={handleStreetSelect} />

      {/* Formulario debajo del mapa */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Reportar Calle Sin Nombre
          </h2>

          {formData.codigo && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600">
                Calle seleccionada: <strong>Código {formData.codigo}</strong>
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="codigo" className="block text-sm font-medium text-gray-700 mb-1">
                Código de Calle
              </label>
              <input
                type="text"
                id="codigo"
                name="codigo"
                value={formData.codigo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                placeholder="Haz clic en una calle roja del mapa"
                readOnly
              />
            </div>

            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                Tu Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingresa tu nombre"
                required
              />
            </div>

            <div>
              <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="correo"
                name="correo"
                value={formData.correo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="tu@email.com"
                required
              />
            </div>

            <button
              type="submit"
              disabled={!formData.codigo}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {formData.codigo ? 'Enviar Reporte' : 'Selecciona una calle primero'}
            </button>
          </form>

          {!formData.codigo && (
            <p className="text-sm text-gray-500 mt-4 text-center">
              💡 Haz clic en una <span className="text-red-500 font-semibold">calle roja</span> (sin nombre) en el mapa para seleccionarla
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;