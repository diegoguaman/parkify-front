import { Box, Typography } from "@mui/material";
import { ParkingCard } from "../../parkings/components/ParkingCard";
import MapControls from "../components/MapControls";
import { useParkingStore } from "../../../store/parking.store";

/**
 * RecommendedPage - Displays list of recommended parkings
 */
const RecommendedPage = () => {
  const recommendedParkings = useParkingStore((s) => s.nearbyParkings);

  const handleReserve = (parking: any) => {
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
        mt={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={1}
        mx="auto"
      >
        {recommendedParkings.length > 0 ? (
          recommendedParkings.map((parking) => (
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
    </>
  );
};

export default RecommendedPage;