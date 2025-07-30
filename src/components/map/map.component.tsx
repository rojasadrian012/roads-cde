import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import 'leaflet/dist/leaflet.css';
import classes from "./map.component.module.css";
import roadsData from './roads-wgs84.json';
import { GeoJsonLayer } from "./geo-json-layer.component";

interface MapProps {
  onStreetSelect: (codigo: string) => void; // Función que recibe desde App
}

export const Map: React.FC<MapProps> = ({ onStreetSelect }) => {
  const roads = roadsData; // Tus datos

  return (
    <div className="p-4">
      <h1 className="text-blue-600 text-2xl mb-4">CDE Map</h1>
      <p className="mb-2 text-gray-600">
        Calles cargadas: {roads.features.length}
      </p>
      <MapContainer
        center={[-25.5095, -54.6158]}
        zoom={13}
        scrollWheelZoom={true}
        className={classes.mapContainer}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Pasar la función onStreetSelect al GeoJsonLayer */}
        <GeoJsonLayer data={roads as GeoJsonData} onStreetSelect={onStreetSelect} />
      </MapContainer>
    </div>
  );
};