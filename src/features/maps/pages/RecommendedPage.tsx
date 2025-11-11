import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import { ParkingCard } from "../../parkings/components/ParkingCard";
import MapControls from "../components/MapControls";
import { useParkingStore } from "../../../store/parking.store";
import { useAuthStore } from "../../../store/auth.store";
import { useUserLocationStore } from "../store/userLocation.store";
import { getRecommendedParkings } from "../../recommendations/services/RecommendationService";
import { Parking } from "../../../store/parking.store";

/**
 * RecommendedPage - Displays list of recommended parkings
 * Uses backend recommendations if user is authenticated, otherwise shows nearby parkings
 */
const RecommendedPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendedParkings, setRecommendedParkings] = useState<Parking[]>([]);
  
  const nearbyParkings = useParkingStore((s) => s.nearbyParkings);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const location = useUserLocationStore((s) => s.location);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!location) return;

      // Si el usuario está autenticado, usa el endpoint de recomendaciones del backend
      if (isAuthenticated) {
        setIsLoading(true);
        setError(null);
        try {
          const recommendations = await getRecommendedParkings(location.lat, location.lng, 5);
          
          // Mapea las recomendaciones del backend al formato del store
          const mapped: Parking[] = recommendations.map(rec => ({
            id: rec.id,
            parkingName: rec.name,
            parkingAddress: rec.address,
            lat: rec.location.latitude,
            lng: rec.location.longitude,
            distance: rec.distance,
            availableSpots: rec.currentAvailability,
            hourlyRate: rec.hourlyRate,
            rating: rec.rating,
            imageParking: rec.parkingImageUrl,
            parkingPhone: rec.parkingPhone,
            isParkingLoaded: true,
            openTime: '',
            closeTime: '',
            email: '',
            totalSpots: 0,
            ownerId: '',
            isOpen: true,
          }));

          setRecommendedParkings(mapped);
        } catch (err) {
          console.error('Error fetching recommendations:', err);
          setError('No se pudieron cargar las recomendaciones. Mostrando parkings cercanos.');
          setRecommendedParkings(nearbyParkings);
        } finally {
          setIsLoading(false);
        }
      } else {
        // Si no está autenticado, usa los parkings cercanos
        setRecommendedParkings(nearbyParkings);
      }
    };

    fetchRecommendations();
  }, [isAuthenticated, location, nearbyParkings]);

  const handleReserve = (parking: Parking) => {
    const phone = parking.parkingPhone;
    const message = encodeURIComponent(
      `Hola, quiero reservar una plaza en ${parking.parkingName}.`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return (
    <>
      <MapControls showList={false} />
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
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="warning" sx={{ width: '100%' }}>
            {error}
          </Alert>
        ) : null}

        {!isLoading && recommendedParkings.length > 0 ? (
          <>
            {isAuthenticated && !error && (
              <Alert severity="info" sx={{ width: '100%', mb: 1 }}>
                ✨ Recomendaciones personalizadas basadas en tu ubicación
              </Alert>
            )}
            {recommendedParkings.map((parking) => (
              <ParkingCard
                key={parking.id}
                parking={parking}
                onReserve={() => handleReserve(parking)}
              />
            ))}
          </>
        ) : !isLoading && (
          <Typography>
            No hay estacionamientos recomendados por el momento.
          </Typography>
        )}
      </Box>
    </>
  );
};

export default RecommendedPage;