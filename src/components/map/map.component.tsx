import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import 'leaflet/dist/leaflet.css';
import classes from "./map.component.module.css";
import roadsData from './roads-wgs84.json';
import type { GeoJsonData } from "./map.component.interfaces";
import { GeoJsonLayer } from "./geo-json-layer.component";



export const Map: React.FC = () => {
  const roads: GeoJsonData = roadsData as GeoJsonData;
  return (
    <div className="p-4">
      <h1 className="text-blue-600 text-2xl mb-4">CDE Map</h1>

      <p className="mb-2 text-gray-600">
        Calles cargadas: {roads.features.length}
      </p>

      <MapContainer
        center={[-25.5095, -54.6158]} // Coordenadas de Ciudad del Este
        zoom={13}
        scrollWheelZoom={true}
        className={classes.mapContainer}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJsonLayer data={roads} />
      </MapContainer>
    </div>
  );
};