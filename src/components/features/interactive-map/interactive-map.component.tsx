import React from "react";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from "react-leaflet";
import { StreetSearcher, type GeoJsonData, Legends, LocationMarker, StreetGeoJsonLayer } from "./components";
import roadsData from './data/roads-wgs84.json';
import classes from "./interactive-map.component.module.css";

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
  const roads = roadsData as GeoJsonData;

  const handleStreetFound = (codigo: string, nombre: string) => {
    console.log('Calle encontrada:', codigo, nombre);
    setFoundStreetCode(codigo);
  };

  return (
    <>
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
          data={roads}
          onStreetSelect={onStreetSelect}
          selectedStreetCode={selectedStreetCode}
          foundStreetCode={foundStreetCode}
        />
      </MapContainer>
    </>
  );
};