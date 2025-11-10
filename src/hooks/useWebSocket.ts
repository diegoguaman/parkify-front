import { useEffect } from 'react';
import { websocketService, AvailabilityUpdateData } from '../services/websocket.service';
import { useParkingStore } from '../store/parking.store';
import { toast } from 'react-toastify';

/**
 * Custom hook to manage WebSocket connection and real-time updates
 * Automatically connects on mount and disconnects on unmount
 * Updates Zustand store when availability changes
 */
export const useWebSocket = () => {
  const setAvailability = useParkingStore((state) => state.setAvailability);

  useEffect(() => {
    // Connect to WebSocket server
    websocketService.connect();

    // Subscribe to availability updates
    const handleAvailabilityUpdate = (data: AvailabilityUpdateData) => {
      console.log('📡 Received availability update:', data);
      
      // Update Zustand store
      setAvailability(data.parkingId, data.availableSpots);
      
      // Show toast notification (optional, can be removed for less noise)
      // toast.info(`Parking ${data.parkingId} updated: ${data.availableSpots} spots available`);
    };

    websocketService.onAvailabilityUpdate(handleAvailabilityUpdate);

    // Optional: Subscribe to new parkings
    const handleParkingCreated = (data: any) => {
      console.log('🆕 New parking created:', data);
      toast.success(`New parking available: ${data.parkingName}`);
      // You can refresh the parking list here if needed
    };

    websocketService.onParkingCreated(handleParkingCreated);

    // Cleanup on unmount
    return () => {
      websocketService.off('parking:availabilityUpdated');
      websocketService.off('parking:created');
      // Note: We don't disconnect here because other components might still need it
      // Only disconnect when the app closes
    };
  }, [setAvailability]);

  return {
    isConnected: websocketService.isConnected(),
    updateAvailability: websocketService.updateAvailability.bind(websocketService),
  };
};

