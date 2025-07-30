import { useMapEvents } from "react-leaflet";

export const MapEventComponent: React.FC = () => {
  const map = useMapEvents({
    click: (e) => {
      console.log('Map clicked at:', e.latlng);
    },
    locationfound: (location) => {
      console.log('Location found:', location);
      map.setView(location.latlng, 13);
    },
  });

  return null; 
}