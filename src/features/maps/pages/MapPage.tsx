import { useState } from 'react';
import { useUserLocation } from '../hooks/useUserLocation';
import { MapWrapper } from '../components/MapWrapper';
import { MapView } from '../components/MapView';
import { Box, Stack } from '@mui/material';
import { Parking } from '../../../store/parking.store';
import { ParkingCard } from '../../../features/parkings/components/ParkingCard';
import useMapStore from '../store/useMap.store';

const MapPage = () => {
  useUserLocation();
  const [selectedParking, setSelectedParking] = useState<Parking | null>(null);
  const [showList, setShowList] = useState(false);
  const filteredParkings = useMapStore((state) => state.filteredParkings); // los parkings filtrados

  return (
    <Box sx={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <MapWrapper>
      
        <MapView onParkingSelect={setSelectedParking} onListClick={() => setShowList(prev => !prev)} />

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
