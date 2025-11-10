import { Circle, Popup } from 'react-leaflet';
import { RecommendedZone } from '../utils/recommendations';
import { Box, Typography, Chip, Stack } from '@mui/material';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

type Props = {
  zones: RecommendedZone[];
  onZoneClick?: (zone: RecommendedZone) => void;
};

/**
 * RecommendedZones - Displays recommended parking zones as colored circles on the map
 * Zones with higher scores appear with more vibrant colors
 */
const RecommendedZones = ({ zones, onZoneClick }: Props) => {
  if (zones.length === 0) return null;

  return (
    <>
      {zones.map((zone) => (
        <Circle
          key={zone.id}
          center={[zone.centerLat, zone.centerLng]}
          radius={zone.radius * 1000} // Convert km to meters
          pathOptions={{
            color: zone.color,
            fillColor: zone.color,
            fillOpacity: 0.15,
            weight: 2,
            opacity: 0.6,
          }}
          eventHandlers={{
            click: () => {
              onZoneClick?.(zone);
            },
          }}
        >
          <Popup>
            <Box sx={{ minWidth: 200, p: 1 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Zona Recomendada
              </Typography>

              <Stack spacing={1.5}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocalParkingIcon fontSize="small" color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Parkings en zona
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {zone.parkingsInZone.length} opciones
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocalParkingIcon fontSize="small" color="success" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Plazas disponibles
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" color="success.main">
                      {zone.totalAvailableSpots} plazas
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AttachMoneyIcon fontSize="small" color="action" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Precio promedio
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {zone.averagePrice.toFixed(2)}€/hora
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                  <Chip
                    label={`Score: ${Math.round(zone.score)}`}
                    size="small"
                    sx={{
                      bgcolor: zone.color,
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  />
                </Box>

                <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                  💡 Click en los marcadores para ver más detalles
                </Typography>
              </Stack>
            </Box>
          </Popup>
        </Circle>
      ))}
    </>
  );
};

export default RecommendedZones;

