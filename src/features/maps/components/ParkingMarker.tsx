import { Marker } from 'react-leaflet';
import { Parking } from '../../../store/parking.store';
import { createPriceMarkerIcon } from '../utils/parking-icons';
import { recommendedParkingIds } from '../data/mock-parkings';

type Props = {
  parking: Parking;
  onClick: () => void;
};

/**
 * ParkingMarker - Custom marker for parking spots on Leaflet map
 * Displays price with different styles based on availability and recommendation
 */
const ParkingMarker = ({ parking, onClick }: Props) => {
  const isRecommended = recommendedParkingIds.includes(parking.id);
  const isFull = parking.availableSpots === 0;

  // Determine marker type
  let markerType: 'normal' | 'full' | 'recommended' = 'normal';
  if (isFull) markerType = 'full';
  else if (isRecommended) markerType = 'recommended';

  const icon = createPriceMarkerIcon(parking.hourlyRate, markerType);

  return (
    <Marker
      position={[parking.lat, parking.lng]}
      icon={icon}
      eventHandlers={{
        click: onClick,
      }}
    />
  );
};

export default ParkingMarker;
