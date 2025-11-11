import { useState, useCallback, useEffect } from 'react';
import { useUserLocation } from '../hooks/useUserLocation';
import { MapWrapper } from '../components/MapWrapper';
import { MapView } from '../components/MapView';
import { Box, Stack, Typography } from '@mui/material';
import { Parking, useParkingStore } from '../../../store/parking.store';
import { ParkingCard } from '../../../features/parkings/components/ParkingCard';
import useMapStore from '../store/useMap.store';
import ParkingDetailModal from '../components/ParkingDetailModal';
import { RecommendedZone } from '../utils/recommendations';
import LocationPermissionModal from '../components/LocationPermissionModal';

const MapPage = () => {
  const { error: locationError, retry: retryLocation } = useUserLocation();
  const [selectedParking, setSelectedParking] = useState<Parking | null>(null);
  const [showList, setShowList] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showRecommendations] = useState(true);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showRecommendedList, setShowRecommendedList] = useState(false);
  const filteredParkings = useMapStore((state) => state.filteredParkings);
  const nearbyParkings = useParkingStore((s) => s.nearbyParkings);
  
  // Show location modal if there's a permission error
  useEffect(() => {
    if (locationError === 'permission') {
      setShowLocationModal(true);
    }
  }, [locationError]);
  
  const handleParkingSelect = (parking: Parking | null) => {
    setSelectedParking(parking);
    setIsModalOpen(true);
  };

  const handleZoneSelect = useCallback((zone: RecommendedZone) => {
    console.log('Zone selected:', zone);
    // Could implement map centering here if needed
    // For now, zones are visible on the map
  }, []);

  const handleReserve = useCallback((parking: Parking) => {
    const phone = parking.parkingPhone;
    const message = encodeURIComponent(`Hola, quiero reservar una plaza en ${parking.parkingName}.`);
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  }, []);

  // Si está mostrando la lista de recomendados, no mostrar el mapa
  if (showRecommendedList) {
    return (
      <Box sx={{ position: 'relative', height: '100vh', overflow: 'auto', bgcolor: 'background.default' }}>
        <MapWrapper>
          <MapView 
            onParkingSelect={handleParkingSelect} 
            onListClick={() => {
              setShowList(prev => !prev);
              setShowRecommendedList(false);
            }}
            showRecommendations={showRecommendations}
            onZoneClick={handleZoneSelect}
            isHidden={true}
            onShowRecommendedList={() => setShowRecommendedList(false)}
          />
          
          <Box
            width={{ xs: "100%", md: "30%" }}
            mt={{ xs: 1, md: 2 }}
            pt={{ xs: 0, md: 2 }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1}
            mx="auto"
          >
            {nearbyParkings.length > 0 ? (
              nearbyParkings.map((parking) => (
                <ParkingCard
                  key={parking.id}
                  parking={parking}
                  onReserve={() => handleReserve(parking)}
                />
              ))
            ) : (
              <Typography>
                No hay estacionamientos recomendados por el momento.
              </Typography>
            )}
          </Box>
        </MapWrapper>
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <MapWrapper>
      
        <MapView 
          onParkingSelect={handleParkingSelect} 
          onListClick={() => setShowList(prev => !prev)}
          showRecommendations={showRecommendations}
          onZoneClick={handleZoneSelect}
          onShowRecommendedList={() => setShowRecommendedList(true)}
        />

        {/* Modal de detalles del parking */}
        <ParkingDetailModal
          parking={selectedParking}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedParking(null);
          }}
        />

        {/* Location Permission Modal */}
        <LocationPermissionModal
          isOpen={showLocationModal}
          onClose={() => setShowLocationModal(false)}
          onRetry={() => {
            retryLocation();
            setShowLocationModal(false);
          }}
          errorType={locationError}
        />
        {/* Lista scrolleable de parkings */}
        {showList && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 0, 
              left: {xs: '50%', sm: '0'}, 
              transform: {xs: 'translateX(-50%)', sm: 'translateX(0%)'}, 
              width: {xs: "100%", md:"30%"} , 
              height: {xs: "40%", md:"68%"}, 
              bgcolor: 'background.paper',
              overflowY: 'auto',
              p: 2,
              zIndex: 1100,
              boxShadow: 6, 
            }}
          >
            <Stack spacing={2}>
              {filteredParkings.length > 0 ? (
                filteredParkings.map((parking) => (
                  <ParkingCard
                    key={parking.id}
                    parking={parking}
                    onReserve={() => handleReserve(parking)}
                  />
                ))
              ) : (
                <p>No se encontraron parkings disponibles.</p>
              )}
            </Stack>
          </Box>
        )}

      </MapWrapper>
    </Box>
  );
};

export default MapPage;
