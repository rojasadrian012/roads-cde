import L from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { streetColors, streetWidth } from '@/styles';
import type { GeoJsonData, GeoJsonFeature } from './types';
import { popupContent } from './popup-content.component';


interface Props {
  data: GeoJsonData;
  onStreetSelect: (codigo: string) => void;
  selectedStreetCode?: string;
  foundStreetCode?: string;
}

export const StreetGeoJsonLayer: React.FC<Props> = ({
  data,
  onStreetSelect,
  selectedStreetCode,
  foundStreetCode
}) => {
  const map = useMap();

  useEffect(() => {
    const geoJsonLayer = L.geoJSON(data, {
      style: (feature) => {
        if (!feature?.properties) return { color: streetColors.default, weight: streetWidth.default };

        const withName = feature.properties.NOMBRE;
        const isSelected = feature.properties.CODIGO_CAL === selectedStreetCode;
        const isFound = feature.properties.CODIGO_CAL === foundStreetCode;

        let color = streetColors.default;
        let weight = streetWidth.default;

        if (isSelected) {
          color = streetColors.selected;
          weight = streetWidth.selected;
        } else if (isFound) {
          color = streetColors.found;
          weight = streetWidth.found;
        } else if (!withName) {
          color = streetColors.withoutName;
        }

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

          // Solo para calles SIN nombre (rojas)
          if (!feature.properties.NOMBRE) {
            layer.on('click', () => {
              onStreetSelect(feature.properties.CODIGO_CAL);

              setTimeout(() => {
                const formElement = document.querySelector('form');
                if (formElement) {
                  formElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  });
                }
              }, 100);

              layer.closePopup();
            });

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

    // Centrar el mapa en la calle encontrada
    if (foundStreetCode) {
      // Buscar la feature correspondiente al código encontrado
      const foundFeature = data.features.find(
        feature => feature.properties?.CODIGO_CAL === foundStreetCode
      );

      if (foundFeature && foundFeature.geometry) {
        // Obtener los bounds de la geometría de la calle
        const tempLayer = L.geoJSON(foundFeature);
        const bounds = tempLayer.getBounds();
        
        // Centrar el mapa en los bounds de la calle encontrada
        map.fitBounds(bounds, {
          padding: [20, 20], // Añadir un poco de padding
          maxZoom: 16 // Evitar hacer zoom muy cercano
        });
      }
    }

    return () => {
      map.removeLayer(geoJsonLayer);
    };
  }, [map, data, onStreetSelect, selectedStreetCode, foundStreetCode]);

  return null;
};