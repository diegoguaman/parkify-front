import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationOffIcon from '@mui/icons-material/LocationOff';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
  errorType: 'permission' | 'timeout' | 'unavailable' | null;
};

/**
 * LocationPermissionModal - Explains location permission issues
 * Provides clear instructions on how to enable location
 */
const LocationPermissionModal = ({ isOpen, onClose, onRetry, errorType }: Props) => {
  const getTitle = (): string => {
    switch (errorType) {
      case 'permission':
        return 'Permisos de ubicación denegados';
      case 'timeout':
        return 'No se pudo obtener tu ubicación';
      case 'unavailable':
        return 'Ubicación no disponible';
      default:
        return 'Error de ubicación';
    }
  };

  const getMessage = (): string => {
    switch (errorType) {
      case 'permission':
        return 'Necesitamos acceso a tu ubicación para mostrarte los parkings más cercanos. Por favor, habilita los permisos de ubicación en tu navegador.';
      case 'timeout':
        return 'La solicitud de ubicación tardó demasiado. Verifica tu conexión GPS y vuelve a intentarlo.';
      case 'unavailable':
        return 'No pudimos determinar tu ubicación actual. Asegúrate de que el GPS esté activado en tu dispositivo.';
      default:
        return 'Ocurrió un error al intentar obtener tu ubicación.';
    }
  };

  const getInstructions = (): string[] => {
    if (errorType === 'permission') {
      return [
        '1. Haz clic en el ícono de candado o información en la barra de direcciones',
        '2. Busca la opción "Permisos" o "Ubicación"',
        '3. Selecciona "Permitir" para este sitio web',
        '4. Recarga la página o haz clic en "Reintentar"',
      ];
    }
    return [
      '1. Verifica que el GPS esté activado en tu dispositivo',
      '2. Asegúrate de tener buena señal',
      '3. Intenta reiniciar la aplicación',
      '4. Haz clic en "Reintentar"',
    ];
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
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {errorType === 'permission' ? (
          <LocationOffIcon color="error" fontSize="large" />
        ) : (
          <LocationOnIcon color="warning" fontSize="large" />
        )}
        <Typography variant="h6" component="span" fontWeight="bold">
          {getTitle()}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Alert
          severity={errorType === 'permission' ? 'error' : 'warning'}
          sx={{ mb: 2 }}
        >
          {getMessage()}
        </Alert>

        <Box sx={{ my: 2 }}>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            📍 ¿Cómo solucionarlo?
          </Typography>
          <Box component="ul" sx={{ pl: 2, m: 0 }}>
            {getInstructions().map((instruction, index) => (
              <Typography key={index} component="li" variant="body2" sx={{ mb: 1 }}>
                {instruction}
              </Typography>
            ))}
          </Box>
        </Box>

        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2">
            💡 <strong>¿Por qué necesitamos tu ubicación?</strong>
            <br />
            La usamos únicamente para mostrarte parkings cercanos y calcular distancias. 
            No guardamos ni compartimos tu ubicación.
          </Typography>
        </Alert>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit">
          Usar ubicación por defecto
        </Button>
        <Button onClick={onRetry} variant="contained" color="primary">
          Reintentar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LocationPermissionModal;

