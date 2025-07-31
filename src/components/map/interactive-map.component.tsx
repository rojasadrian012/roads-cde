import React from "react";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from "react-leaflet";

import classes from "./interactive-map.component.module.css";
import roadsData from './roads-wgs84.json';
import type { GeoJsonData } from "./interactive-map.component.interfaces";
import { StreetGeoJsonLayer } from "./street-geo-json-layer.component";
import { LocationMarker } from "./location-marker.component";

interface MapProps {
  onStreetSelect: (codigo: string) => void; 
}

export const InteractiveMap: React.FC<MapProps> = ({ onStreetSelect }) => {
  const roads = roadsData; 

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
        <LocationMarker />
        <StreetGeoJsonLayer 
          data={roads as GeoJsonData} 
          onStreetSelect={onStreetSelect}   
        />
      </MapContainer>
    </div>
  );
};