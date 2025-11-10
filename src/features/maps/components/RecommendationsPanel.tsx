import { Box, Card, CardContent, Typography, Stack, Chip, IconButton, Collapse } from '@mui/material';
import { RecommendedZone } from '../utils/recommendations';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

type Props = {
  zones: RecommendedZone[];
  onZoneSelect: (zone: RecommendedZone) => void;
  onClose: () => void;
  isOpen: boolean;
};

/**
 * RecommendationsPanel - Sidebar showing list of recommended zones
 * Users can click on a zone to center the map on it
 */
const RecommendationsPanel = ({ zones, onZoneSelect, onClose, isOpen }: Props) => {
  const [expandedZone, setExpandedZone] = useState<string | null>(null);

  const handleToggleExpand = (zoneId: string) => {
    setExpandedZone(expandedZone === zoneId ? null : zoneId);
  };

  if (!isOpen || zones.length === 0) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: { xs: 60, md: 16 },
        right: { xs: '50%', md: 16 },
        transform: { xs: 'translateX(50%)', md: 'none' },
        width: { xs: '95%', sm: 380, md: 400 },
        maxHeight: { xs: '50vh', md: '80vh' },
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 6,
        zIndex: 1000,
        overflowY: 'auto',
        p: 2,
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          🎯 Zonas Recomendadas
        </Typography>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Zonas con mayor disponibilidad y mejores condiciones
      </Typography>

      {/* Zone List */}
      <Stack spacing={2}>
        {zones.map((zone, index) => (
          <Card
            key={zone.id}
            elevation={2}
            sx={{
              cursor: 'pointer',
              transition: 'all 0.2s',
              borderLeft: `4px solid ${zone.color}`,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 4,
              },
            }}
          >
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              {/* Zone Header */}
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}
                onClick={() => onZoneSelect(zone)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip
                    label={`#${index + 1}`}
                    size="small"
                    sx={{
                      bgcolor: zone.color,
                      color: 'white',
                      fontWeight: 'bold',
                      minWidth: 40,
                    }}
                  />
                  <Typography variant="subtitle1" fontWeight="bold">
                    Zona {index + 1}
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleExpand(zone.id);
                  }}
                  sx={{
                    transform: expandedZone === zone.id ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s',
                  }}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Box>

              {/* Quick Stats */}
              <Box
                sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 1 }}
                onClick={() => onZoneSelect(zone)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <LocalParkingIcon fontSize="small" color="success" />
                  <Typography variant="body2" fontWeight="bold" color="success.main">
                    {zone.totalAvailableSpots} plazas
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <AttachMoneyIcon fontSize="small" color="action" />
                  <Typography variant="body2">
                    {zone.averagePrice.toFixed(2)}€/h
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <LocalParkingIcon fontSize="small" color="primary" />
                  <Typography variant="body2">
                    {zone.parkingsInZone.length} parkings
                  </Typography>
                </Box>
              </Box>

              {/* Expand for Details */}
              <Collapse in={expandedZone === zone.id}>
                <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    Parkings en esta zona:
                  </Typography>
                  <Stack spacing={1}>
                    {zone.parkingsInZone.map((parking) => (
                      <Box
                        key={parking.id}
                        sx={{
                          p: 1,
                          bgcolor: 'background.default',
                          borderRadius: 1,
                          fontSize: '0.875rem',
                        }}
                      >
                        <Typography variant="body2" fontWeight="bold">
                          {parking.parkingName}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                          <Typography variant="caption" color="text.secondary">
                            {parking.availableSpots} plazas
                          </Typography>
                          <Typography variant="caption" color="primary">
                            {parking.hourlyRate}€/h
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Collapse>

              {/* Center Map Button */}
              <Box
                sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}
                onClick={() => onZoneSelect(zone)}
              >
                <Chip
                  icon={<MyLocationIcon />}
                  label="Ver en mapa"
                  size="small"
                  clickable
                  color="primary"
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Footer Info */}
      <Box sx={{ mt: 2, p: 1, bgcolor: 'info.light', borderRadius: 1 }}>
        <Typography variant="caption" color="info.dark">
          💡 Las zonas se actualizan en tiempo real según la disponibilidad
        </Typography>
      </Box>
    </Box>
  );
};

export default RecommendationsPanel;

