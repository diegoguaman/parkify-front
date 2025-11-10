import { MapContainer, TileLayer } from 'react-leaflet';
import { useUserLocationStore } from '../store/userLocation.store';
import { MarkerList } from './MarkerList';
import { Parking, useParkingStore } from '../../../store/parking.store';
import Loader from '../../../shared/ui/components/Loader';
import { useEffect } from 'react';
import MapControls from './MapControls';

type MapViewProps = {
  onParkingSelect: (parking: Parking | null) => void;
  onListClick: () => void;
};

/**
 * MapView - Main map component using Leaflet and OpenStreetMap
 * Free alternative to Google Maps
 */
export const MapView = ({ onParkingSelect, onListClick }: MapViewProps) => {
  const location = useUserLocationStore((s) => s.location);
  const { isLoadingNearby, fetchNearbyParkings } = useParkingStore();

  useEffect(() => {
    if (location) {
      // Fetch nearby parkings when location is available
      fetchNearbyParkings(location.lat, location.lng, 5);
    }
  }, [location, fetchNearbyParkings]);

  if (!location || isLoadingNearby) {
    return <Loader fullScreen />;
  }

  return (
    <MapContainer
      center={[location.lat, location.lng]}
      zoom={15}
      style={{ width: '100%', height: '100vh' }}
      zoomControl={false}
      scrollWheelZoom={true}
    >
      {/* OpenStreetMap tiles - Free and open source */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapControls showList={true} toggleList={onListClick} />
      <MarkerList onParkingSelect={onParkingSelect} />
    </MapContainer>
  );
};
