import { useEffect } from 'react';
import { getSocket } from '../lib/socket';  // Asegúrate de que esta importación esté correcta
import { useParkingStore } from '../../../store/parking.store';

/**
 * Hook para manejar la conexión del socket y escuchar eventos de disponibilidad
 * @returns {void}
 */
export const useAvailabilitySocket = (): void => {
  const setAvailability = useParkingStore((state) => state.setAvailability);  // Sacamos el hook de aquí

  useEffect(() => {
    // Obtener la instancia del socket usando getSocket
    const socket = getSocket();  // Aquí estamos usando getSocket

    if (!socket) {
      console.warn('Socket está deshabilitado o no disponible. Saltando actualizaciones en tiempo real.');
      return;
    }

    // Solo conectar si no está ya conectado
    socket.onopen = () => {
      console.log('✅ WebSocket conectado.');
    };

    // Evento: alguien modificó la disponibilidad
    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (data && data.parkingId && data.slots !== undefined) {
        setAvailability(data.parkingId, data.slots);
      }
    });

    // Cleanup: Cerrar la conexión cuando el componente se desmonte
    return () => {
      socket.close();
    };
  }, [setAvailability]); // El hook se ejecuta solo cuando `setAvailability` cambia
};

