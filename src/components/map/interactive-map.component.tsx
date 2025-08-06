import React from "react";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from "react-leaflet";

import classes from "./interactive-map.component.module.css";
import roadsData from './roads-wgs84.json';
import type { GeoJsonData } from "./interactive-map.component.interfaces";
import { StreetGeoJsonLayer } from "./street-geo-json-layer.component";
import { LocationMarker } from "./location-marker.component";
import Container from "../container.component";
import { Legends } from "./legends.component";
import { StreetSearcher } from "./street-searcher.component";

interface Props {
  onStreetSelect: (codigo: string) => void;
  selectedStreetCode?: string;
  foundStreetCode?: string;
  setFoundStreetCode: React.Dispatch<React.SetStateAction<string | undefined>>
}

export const InteractiveMap: React.FC<Props> = ({
  onStreetSelect,
  selectedStreetCode,
  foundStreetCode,
  setFoundStreetCode
}) => {
  const roads = roadsData;

  const handleStreetFound = (codigo: string, nombre: string) => {
    console.log('Calle encontrada:', codigo, nombre);
    setFoundStreetCode(codigo);
  };

  return (
    <Container id="interactive-map">
      <h2 className="text-primary text-4xl md:text-6xl md:leading-tight font-bold text-foreground max-w-lg md:max-w-2xl pb-2.5">
        Mapa interactivo
      </h2>
      <StreetSearcher
        roadsData={roadsData as GeoJsonData}
        onStreetFound={handleStreetFound}
      />
      <Legends />
      <MapContainer
        center={[-25.5095, -54.6158]}
        zoom={13}
        scrollWheelZoom={true}
        className={`${classes.mapContainer} h-[500px] lg:h-[600px]`}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
        <StreetGeoJsonLayer
          data={roads as GeoJsonData}
          onStreetSelect={onStreetSelect}
          selectedStreetCode={selectedStreetCode}
          foundStreetCode={foundStreetCode}
        />
      </MapContainer>
    </Container>
  );
};