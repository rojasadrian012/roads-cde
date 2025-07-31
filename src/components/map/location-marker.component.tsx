import React from "react";
import type { LatLng } from "leaflet";
import { Marker, Popup, useMap } from "react-leaflet";


export const LocationMarker: React.FC = () => {
    const map = useMap();
    const [position, setPosition] = React.useState<LatLng | null>(null);

    React.useEffect(() => {
        map.locate({ setView: true, maxZoom: 16 });

        const onLocationFound = (e: L.LocationEvent) => {
            console.log('▶️ Leaflet.locationfound:', {
                lat: e.latlng.lat,
                lng: e.latlng.lng,
                accuracy: e.accuracy
            });
            setPosition(e.latlng);
        };
        const onLocationError = (e: L.ErrorEvent) => {
            console.error('❌ Leaflet.locationerror:', e.message);
        };

        map.on('locationfound', onLocationFound);
        map.on('locationerror', onLocationError);
        return () => {
            map.off('locationfound', onLocationFound);
            map.off('locationerror', onLocationError);
        };
    }, [map]);

    if (!position) return null;

    return (
        <>
            <Marker position={position}>
                <Popup>¡Estás aquí!</Popup>
            </Marker>
        </>
    );
};
