import { GoogleMap } from '@react-google-maps/api';
import { useUserLocationStore } from '../store/userLocation.store';
import { MarkerList } from './MarkerList';

const containerStyle = { width: '100%', height: '100vh' };

export const MapView = () => {
  const location = useUserLocationStore((s) => s.location);

  if (!location) return <p>Cargando ubicación...</p>;

  return (
    <GoogleMap center={location} zoom={15} mapContainerStyle={containerStyle}>
      <MarkerList />
    </GoogleMap>
  );
};
