import L from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import type { GeoJsonData, GeoJsonFeature } from './map.component.interfaces';
import { popupContent } from './popup-content';

interface Props {
    data: GeoJsonData
}

export const GeoJsonLayer: React.FC<Props> = ({ data }) => {
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
            }
        },
    });

    geoJsonLayer.addTo(map);

    // Ajustar la vista del mapa a los límites del GeoJSON
    if (geoJsonLayer.getBounds().isValid()) {
        map.fitBounds(geoJsonLayer.getBounds(), { padding: [10, 10] });
    }

    return () => {
        map.removeLayer(geoJsonLayer);
    };
}, [map, data]);


    return null;
};