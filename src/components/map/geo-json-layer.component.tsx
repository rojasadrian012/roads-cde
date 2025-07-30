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
                const tipo = feature?.properties?.TIPO || 'unknown';

                let color = '#3388ff';
                let weight = 2;

                switch (tipo) {
                    case 'residential':
                        color = '#ff7800';
                        weight = 2;
                        break;
                    case 'primary':
                        color = '#ff0000';
                        weight = 4;
                        break;
                    case 'secondary':
                        color = '#ffff00';
                        weight = 3;
                        break;
                    case 'tertiary':
                        color = '#00ff00';
                        weight = 2;
                        break;
                    default:
                        color = '#3388ff';
                        weight = 2;
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
                }
            },
            coordsToLatLng: (coords) => {
                // Transformación aproximada de UTM a lat/lon para Ciudad del Este
                const x = coords[0];
                const y = coords[1];
                const lat = (y - 7000000) / 111320 - 25.5;
                const lon = (x - 740000) / 111320 - 54.6;
                // Devolver una instancia de L.LatLng en lugar de un arreglo
                return new L.LatLng(lat, lon);
            }
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