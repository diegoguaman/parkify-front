import { Alert, Snackbar, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { websocketService } from '../../../services/websocket.service';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import WifiIcon from '@mui/icons-material/Wifi';

/**
 * ConnectionStatus - Displays connection status banner
 * Shows alerts when offline or WebSocket disconnected
 */
const ConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isWsConnected, setIsWsConnected] = useState(false);
  const [showOfflineAlert, setShowOfflineAlert] = useState(false);
  const [showWsAlert, setShowWsAlert] = useState(false);

  useEffect(() => {
    // Handle online/offline events
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineAlert(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineAlert(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check WebSocket status periodically
    const checkWsStatus = setInterval(() => {
      const connected = websocketService.isConnected();
      setIsWsConnected(connected);
      
      if (!connected && isOnline) {
        setShowWsAlert(true);
      } else {
        setShowWsAlert(false);
      }
    }, 2000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(checkWsStatus);
    };
  }, [isOnline]);

  return (
    <>
      {/* Offline Alert */}
      <Snackbar
        open={showOfflineAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ top: { xs: 70, md: 80 } }}
      >
        <Alert 
          severity="error" 
          icon={<WifiOffIcon />}
          sx={{ width: '100%', boxShadow: 3 }}
        >
          Sin conexión a Internet. Algunos datos pueden estar desactualizados.
        </Alert>
      </Snackbar>

      {/* WebSocket Disconnected Alert */}
      <Snackbar
        open={showWsAlert && !showOfflineAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ top: { xs: 70, md: 80 } }}
      >
        <Alert 
          severity="warning"
          icon={<WifiIcon />}
          sx={{ width: '100%', boxShadow: 3 }}
        >
          Reconectando... Las actualizaciones en tiempo real estarán disponibles pronto.
        </Alert>
      </Snackbar>

      {/* Success Reconnection */}
      {isOnline && isWsConnected && (
        <Box sx={{ display: 'none' }} />
      )}
    </>
  );
};

export default ConnectionStatus;

