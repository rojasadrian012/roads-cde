import React, { useState, useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { createLocationIcon } from './create-location-icon';

export const LocationMarker: React.FC = () => {
    const [position, setPosition] = useState<L.LatLng | null>(null);
    const [accuracy, setAccuracy] = useState<number | null>(null);
    const map = useMap();

    useEffect(() => {
        if (!navigator.geolocation) {
            console.log('Geolocation is not supported by this browser.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude, accuracy } = pos.coords;
                const newPosition = new L.LatLng(latitude, longitude);
                setPosition(newPosition);
                setAccuracy(accuracy);

                map.setView(newPosition, map.getZoom());
            },
            (error) => {
                console.error('Error getting location:', error);
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        console.log("User denied the request for Geolocation.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        console.log("Location information is unavailable.");
                        break;
                    case error.TIMEOUT:
                        console.log("The request to get user location timed out.");
                        break;
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    }, [map]);

    if (!position) return null;

    return (
        <Marker
            position={position}
            icon={createLocationIcon()}
        >
            <Popup>
                <div>
                    <strong>Tu ubicación</strong>
                    <br />
                    Precisión: {accuracy ? `${Math.round(Number(accuracy))}m` : 'Desconocida'}
                </div>
            </Popup>
        </Marker>
    );
};
