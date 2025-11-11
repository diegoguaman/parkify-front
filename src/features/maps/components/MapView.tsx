import { MapContainer, TileLayer } from 'react-leaflet';
import { useUserLocationStore } from '../store/userLocation.store';
import { MarkerList } from './MarkerList';
import { Parking, useParkingStore } from '../../../store/parking.store';
import Loader from '../../../shared/ui/components/Loader';
import { useEffect } from 'react';
import MapControls from './MapControls';
import RecommendedZones from './RecommendedZones';
import { useRecommendations } from '../hooks/useRecommendations';
import { RecommendedZone } from '../utils/recommendations';
import useMapStore from '../store/useMap.store';

type MapViewProps = {
  onParkingSelect: (parking: Parking | null) => void;
  onListClick: () => void;
  showRecommendations?: boolean;
  onZoneClick?: (zone: RecommendedZone) => void;
  isHidden?: boolean;
  onShowRecommendedList?: () => void;
};

/**
 * MapView - Main map component using Leaflet and OpenStreetMap
 * Free alternative to Google Maps
 */
export const MapView = ({ 
  onParkingSelect, 
  onListClick, 
  showRecommendations = true,
  onZoneClick,
  isHidden = false,
  onShowRecommendedList
}: MapViewProps) => {
  const location = useUserLocationStore((s) => s.location);
  const { isLoadingNearby, fetchNearbyParkings } = useParkingStore();
  const filteredParkings = useMapStore((state) => state.filteredParkings);
  
  // Calculate recommended zones based on current parkings
  const recommendedZones = useRecommendations(
    filteredParkings,
    location?.lat,
    location?.lng
  );

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
      style={{ 
        width: '100%', 
        height: '100vh',
        display: isHidden ? 'none' : 'block' // Oculta el mapa pero lo mantiene montado
      }}
      zoomControl={false}
      scrollWheelZoom={true}
    >
      {/* OpenStreetMap tiles - Free and open source */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Recommended zones circles */}
      {showRecommendations && (
        <RecommendedZones zones={recommendedZones} onZoneClick={onZoneClick} />
      )}
      
      <MapControls 
        showList={true} 
        toggleList={onListClick}
        onShowRecommendedList={onShowRecommendedList}
      />
      <MarkerList onParkingSelect={onParkingSelect} />
    </MapContainer>
  );
};
