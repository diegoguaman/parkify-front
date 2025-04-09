import { Marker } from '@react-google-maps/api';
import { mockParkings } from '../data/mock-parkings';
import { useParkingStore } from '../store/parkingStore';

export const MarkerList = () => {
  const setSelected = useParkingStore((s) => s.setSelected);

  return (
    <>
      {mockParkings.map((p) => (
        <Marker
          key={p.id}
          position={{ lat: p.lat, lng: p.lng }}
          onClick={() => setSelected(p)}
        />
      ))}
    </>
  );
};
