import { useUserLocation } from '../hooks/useUserLocation';
import { MapView } from '../components/MapView';
import { MapWrapper } from '../components/MapWrapper';
import { Box } from '@mui/material';

const MapPage = () => {
  useUserLocation(); // 👈 dispara la solicitud de ubicación

  return (
  <Box sx={{ position: 'relative', height: '100vh' }}>
    <MapWrapper>
      <MapView />
    </MapWrapper>
</Box>
)
};

export default MapPage;
