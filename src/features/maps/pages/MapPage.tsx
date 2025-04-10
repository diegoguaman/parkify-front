import { useUserLocation } from '../hooks/useUserLocation';
import { MapView } from '../components/MapView';

const MapPage = () => {
  useUserLocation(); // 👈 dispara la solicitud de ubicación

  return <MapView />;
};

export default MapPage;
