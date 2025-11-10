import { Box, Button, Chip, Dialog, DialogContent, DialogTitle, Divider, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DirectionsIcon from '@mui/icons-material/Directions';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Parking } from '../../../store/parking.store';
import { toast } from 'react-toastify';

type Props = {
  parking: Parking | null;
  isOpen: boolean;
  onClose: () => void;
};

/**
 * ParkingDetailModal - Shows detailed information about a parking spot
 * Includes WhatsApp reservation button and directions
 */
const ParkingDetailModal = ({ parking, isOpen, onClose }: Props) => {
  if (!parking) return null;

  const hasAvailableSpots = (parking.availableSpots ?? 0) > 0;

  /**
   * Generates WhatsApp deep link with pre-filled message
   */
  const handleWhatsAppReservation = () => {
    if (!hasAvailableSpots) {
      toast.error('No hay plazas disponibles en este momento');
      return;
    }

    const now = new Date();
    const dateStr = now.toLocaleDateString('es-ES');
    const timeStr = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    
    const message = encodeURIComponent(
      `Hola! Me gustaría reservar una plaza en ${parking.parkingName}.\n\n` +
      `📍 Ubicación: ${parking.parkingAddress}\n` +
      `💰 Tarifa: ${parking.hourlyRate}€/hora\n` +
      `📅 Fecha: ${dateStr}\n` +
      `⏰ Hora: ${timeStr}\n\n` +
      `¿Está disponible?`
    );

    const phoneNumber = parking.parkingPhone.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast.success('Redirigiendo a WhatsApp...');
  };

  /**
   * Opens Google Maps with directions to the parking
   */
  const handleGetDirections = () => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${parking.lat},${parking.lng}`;
    window.open(googleMapsUrl, '_blank');
  };

  /**
   * Returns availability status color
   */
  const getAvailabilityColor = (): 'success' | 'warning' | 'error' => {
    const spots = parking.availableSpots ?? 0;
    if (spots === 0) return 'error';
    if (spots <= 5) return 'warning';
    return 'success';
  };

  /**
   * Returns availability status text
   */
  const getAvailabilityText = (): string => {
    const spots = parking.availableSpots ?? 0;
    if (spots === 0) return 'Completo';
    if (spots === 1) return '1 plaza disponible';
    return `${spots} plazas disponibles`;
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: 3,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 1,
        }}
      >
        <Typography variant="h5" component="div" fontWeight="bold">
          {parking.parkingName}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ pt: 3 }}>
        {/* Parking Image */}
        {parking.imageParking && (
          <Box
            component="img"
            src={parking.imageParking}
            alt={parking.parkingName}
            sx={{
              width: '100%',
              height: 200,
              objectFit: 'cover',
              borderRadius: 2,
              mb: 2,
            }}
          />
        )}

        {/* Availability Status */}
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
          <Chip
            icon={<LocalParkingIcon />}
            label={getAvailabilityText()}
            color={getAvailabilityColor()}
            size="medium"
            sx={{ fontWeight: 'bold', fontSize: '1rem' }}
          />
        </Box>

        {/* Address */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          <DirectionsIcon sx={{ mr: 1, color: 'text.secondary', mt: 0.5 }} />
          <Box>
            <Typography variant="body2" color="text.secondary">
              Dirección
            </Typography>
            <Typography variant="body1">{parking.parkingAddress}</Typography>
          </Box>
        </Box>

        {/* Price */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          <AttachMoneyIcon sx={{ mr: 1, color: 'text.secondary', mt: 0.5 }} />
          <Box>
            <Typography variant="body2" color="text.secondary">
              Tarifa
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {parking.hourlyRate}€ / hora
            </Typography>
          </Box>
        </Box>

        {/* Opening Hours */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          <AccessTimeIcon sx={{ mr: 1, color: 'text.secondary', mt: 0.5 }} />
          <Box>
            <Typography variant="body2" color="text.secondary">
              Horario
            </Typography>
            <Typography variant="body1">
              {parking.openTime} - {parking.closeTime}
            </Typography>
          </Box>
        </Box>

        {/* Distance (if available) */}
        {parking.distance && (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
            <DirectionsIcon sx={{ mr: 1, color: 'text.secondary', mt: 0.5 }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Distancia
              </Typography>
              <Typography variant="body1">
                {parking.distance < 1
                  ? `${(parking.distance * 1000).toFixed(0)} m`
                  : `${parking.distance.toFixed(2)} km`}
              </Typography>
            </Box>
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
          <Button
            variant="contained"
            color="success"
            size="large"
            startIcon={<WhatsAppIcon />}
            onClick={handleWhatsAppReservation}
            disabled={!hasAvailableSpots}
            fullWidth
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              py: 1.5,
            }}
          >
            {hasAvailableSpots ? 'Reservar por WhatsApp' : 'No disponible'}
          </Button>

          <Button
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<DirectionsIcon />}
            onClick={handleGetDirections}
            fullWidth
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              py: 1.5,
            }}
          >
            Cómo llegar
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ParkingDetailModal;

