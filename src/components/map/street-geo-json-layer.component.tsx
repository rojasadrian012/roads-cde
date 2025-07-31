import L from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import type { GeoJsonData, GeoJsonFeature } from './interactive-map.component.interfaces';
import { popupContent } from './popup-content';

interface Props {
  data: GeoJsonData;
  onStreetSelect: (codigo: string) => void; // Nueva prop
}

export const StreetGeoJsonLayer: React.FC<Props> = ({ data, onStreetSelect }) => {
  const map = useMap();

  useEffect(() => {
    const geoJsonLayer = L.geoJSON(data, {
      style: (feature) => {
        const withName = feature?.properties?.NOMBRE;
        let color = withName ? '#808080' : '#ff0000'; 
        let weight = 5;
        
        return {
          color: color,
          weight: weight,
          opacity: 0.8
        };
      },
      onEachFeature: (feature, layer) => {
        if (feature.properties) {
          const popup = popupContent(feature as GeoJsonFeature);
          layer.bindPopup(popup);

          // AQUÍ ES DONDE SE CAPTURA EL CLICK
          // Solo para calles SIN nombre (rojas)
          if (!feature.properties.NOMBRE) {
            layer.on('click', () => {
              console.log('Click en calle sin nombre:', feature.properties.CODIGO_CAL);
              
              // Llamar a la función que viene desde App
              onStreetSelect(feature.properties.CODIGO_CAL);
              
              // Opcional: hacer scroll hacia el formulario
              setTimeout(() => {
                const formElement = document.querySelector('form');
                if (formElement) {
                  formElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }
              }, 100);
              
              // Opcional: cerrar el popup después de seleccionar
              layer.closePopup();
            });
            
            // Cambiar cursor para indicar que es clickeable
            layer.on('mouseover', () => {
              map.getContainer().style.cursor = 'pointer';
            });
            
            layer.on('mouseout', () => {
              map.getContainer().style.cursor = '';
            });
          }
        }
      },
    });

    geoJsonLayer.addTo(map);

    return () => {
      map.removeLayer(geoJsonLayer);
    };
  }, [map, data, onStreetSelect]);

  return null;
};
