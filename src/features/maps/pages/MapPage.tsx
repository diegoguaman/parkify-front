import { useState, useCallback, useRef, useEffect } from 'react';
import { useUserLocation } from '../hooks/useUserLocation';
import { MapWrapper } from '../components/MapWrapper';
import { MapView } from '../components/MapView';
import { Box, Stack, Fab, Tooltip } from '@mui/material';
import { Parking } from '../../../store/parking.store';
import { ParkingCard } from '../../../features/parkings/components/ParkingCard';
import useMapStore from '../store/useMap.store';
import ParkingDetailModal from '../components/ParkingDetailModal';
import RecommendationsPanel from '../components/RecommendationsPanel';
import { RecommendedZone } from '../utils/recommendations';
import { useRecommendations } from '../hooks/useRecommendations';
import { useUserLocationStore } from '../store/userLocation.store';
import RecommendIcon from '@mui/icons-material/Recommend';
import LocationPermissionModal from '../components/LocationPermissionModal';

const MapPage = () => {
  const { error: locationError, retry: retryLocation } = useUserLocation();
  const [selectedParking, setSelectedParking] = useState<Parking | null>(null);
  const [showList, setShowList] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(true);
  const [showRecommendationsPanel, setShowRecommendationsPanel] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const filteredParkings = useMapStore((state) => state.filteredParkings);
  const location = useUserLocationStore((s) => s.location);
  
  // Show location modal if there's a permission error
  useEffect(() => {
    if (locationError === 'permission') {
      setShowLocationModal(true);
    }
  }, [locationError]);
  
  // Calculate recommended zones
  const recommendedZones = useRecommendations(
    filteredParkings,
    location?.lat,
    location?.lng
  );

  const handleParkingSelect = (parking: Parking) => {
    setSelectedParking(parking);
    setIsModalOpen(true);
  };

  const handleZoneSelect = useCallback((zone: RecommendedZone) => {
    console.log('Zone selected:', zone);
    // Could implement map centering here if needed
    // For now, zones are visible on the map
  }, []);

  return (
    <Box sx={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <MapWrapper>
      
        <MapView 
          onParkingSelect={handleParkingSelect} 
          onListClick={() => setShowList(prev => !prev)}
          showRecommendations={showRecommendations}
          onZoneClick={handleZoneSelect}
        />

        {/* Recommendations Panel */}
        <RecommendationsPanel
          zones={recommendedZones}
          onZoneSelect={handleZoneSelect}
          onClose={() => setShowRecommendationsPanel(false)}
          isOpen={showRecommendationsPanel}
        />

        {/* Toggle Recommendations Button */}
        <Tooltip title={showRecommendationsPanel ? "Ocultar recomendaciones" : "Mostrar recomendaciones"}>
          <Fab
            color="primary"
            size="medium"
            onClick={() => setShowRecommendationsPanel(prev => !prev)}
            sx={{
              position: 'absolute',
              top: { xs: 16, md: 24 },
              left: { xs: 16, md: 24 },
              zIndex: 999,
              boxShadow: 3,
            }}
          >
            <RecommendIcon />
          </Fab>
        </Tooltip>

        {/* Modal de detalles del parking */}
        <ParkingDetailModal
          parking={selectedParking}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
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

        {selectedParking && !showList &&(
          <Box
            sx={{
              position: 'fixed',
              bottom: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1000,
              pointerEvents: 'none', // No bloquea el mapa
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              px: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pointerEvents: 'auto', // Permite hacer clic en la tarjeta
                width: '100%',
                maxWidth: 420,
              }}
            >

              <ParkingCard parking={selectedParking} onReserve={() => {
                const phone = selectedParking.parkingPhone;
                const message = encodeURIComponent(`Hola, quiero reservar una plaza en ${selectedParking.parkingName}.`);
                window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
              }}/>
            </Box>
          </Box>
        )}
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
                    onReserve={() => {
                      const phone = parking.parkingPhone;
                      const message = encodeURIComponent(`Hola, quiero reservar una plaza en ${parking.parkingName}.`);
                      window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
                    }}
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
