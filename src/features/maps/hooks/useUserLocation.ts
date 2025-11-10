import { useEffect, useState } from 'react';
import { useUserLocationStore } from '../store/userLocation.store';
import { toast } from 'react-toastify';

export type LocationErrorType = 'permission' | 'timeout' | 'unavailable' | null;

export interface UseUserLocationReturn {
  error: LocationErrorType;
  isLoading: boolean;
  retry: () => void;
}

/**
 * Hook to get user's current location with error handling
 * @returns error type, loading state, and retry function
 */
export const useUserLocation = (): UseUserLocationReturn => {
  const setLocation = useUserLocationStore((s) => s.setLocation);
  const [error, setError] = useState<LocationErrorType>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      console.warn('⚠️ Geolocation not supported');
      setError('unavailable');
      setIsLoading(false);
      // Fallback: Buenos Aires (default location)
      setLocation({ lat: -34.6037, lng: -58.3816 });
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log('✅ Location obtained:', pos.coords);
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setError(null);
        setIsLoading(false);
        
        if (retryCount > 0) {
          toast.success('¡Ubicación obtenida correctamente!');
        }
      },
      (err) => {
        console.error('❌ Location error:', err);
        setIsLoading(false);

        let errorType: LocationErrorType = 'unavailable';
        let fallbackMessage = 'No se pudo obtener tu ubicación. Mostrando ubicación por defecto.';

        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorType = 'permission';
            fallbackMessage = 'Permisos de ubicación denegados. Mostrando ubicación por defecto.';
            break;
          case err.POSITION_UNAVAILABLE:
            errorType = 'unavailable';
            fallbackMessage = 'Ubicación no disponible. Mostrando ubicación por defecto.';
            break;
          case err.TIMEOUT:
            errorType = 'timeout';
            fallbackMessage = 'Tiempo de espera agotado. Mostrando ubicación por defecto.';
            break;
        }

        setError(errorType);
        toast.warning(fallbackMessage);

        // Fallback to Buenos Aires
        setLocation({ lat: -34.6037, lng: -58.3816 });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const retry = () => {
    setRetryCount((prev) => prev + 1);
    requestLocation();
  };

  useEffect(() => {
    requestLocation();
  }, []);

  return { error, isLoading, retry };
};
