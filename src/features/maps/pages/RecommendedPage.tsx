
import { Box,} from "@mui/material";
import { ParkingCard } from "../../parkings/components/ParkingCard";
import MapControls from "../components/MapControls";


const RecommendedPage = () => {
  //const recommendedParkings = useParkingStore((s) => s.nearbyParkings);
        const parking = {
  id: "1",
  imageParking: 'https://dimobaservicios.com/wp-content/uploads/2022/10/como-gestionar-parking.png',
  email: "email@eil.com",
  totalSpots: 25,
  hourlyRate: 12,
  openTime: "16:00",
  closeTime: "18:00",
  parkingName: "América",
  parkingAddress: "Dirección 1",
  parkingPhone: "912729201",
  isParkingLoaded: false,
  lat: 22,
  lng: 23,
  availableSpots: 2,
  rating: 4.5,
  distance: 1.2, // si tu card lo muestra
  ownerId: "1"   // si lo usás
};
const parking2 = {
    id: "1",
    imageParking: 'https://dimobaservicios.com/wp-content/uploads/2022/10/como-gestionar-parking.png',
    email: "email@eil.com",
    totalSpots: 25,
    hourlyRate: 12,
    openTime: "16:00",
    closeTime: "18:00",
    parkingName: "América",
    parkingAddress: "Dirección 1",
    parkingPhone: "912729201",
    isParkingLoaded: false,
    lat: 22,
    lng: 23,
    availableSpots: 2,
    rating: 4.5,
    distance: 1.2, // si tu card lo muestra
    ownerId: "1"   // si lo usás
  };
  return (
    <>
    <MapControls/>
      <Box width={{xs: "100%", md:"30%",}} mt={2} display="flex" flexDirection="column" alignItems="center" gap={1} mx="auto">
          {/* {recommendedParkings.length > 0 ? (
            recommendedParkings.map((parking) => ( */}
              <ParkingCard
                key={parking.id}
                parking={parking}
                onReserve={() => {
                  const phone = parking.parkingPhone;
                  const message = encodeURIComponent(`Hola, quiero reservar una plaza en ${parking.parkingName}.`);
                  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
                }}
              />
              <ParkingCard
                key={parking.id}
                parking={parking}
                onReserve={() => {
                  const phone = parking.parkingPhone;
                  const message = encodeURIComponent(`Hola, quiero reservar una plaza en ${parking.parkingName}.`);
                  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
                }}
              />
              <ParkingCard
                key={parking2.id}
                parking={parking2}
                onReserve={() => {
                  const phone = parking2.parkingPhone;
                  const message = encodeURIComponent(`Hola, quiero reservar una plaza en ${parking2.parkingName}.`);
                  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
                }}
              />
              <ParkingCard
                key={parking.id}
                parking={parking}
                onReserve={() => {
                  const phone = parking.parkingPhone;
                  const message = encodeURIComponent(`Hola, quiero reservar una plaza en ${parking.parkingName}.`);
                  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
                }}
              />
            {/* ))
          ) : (
            <Typography>No hay estacionamientos recomendados por el momento.</Typography>
          )} */}
        </Box>
    </>
      
  );
};

export default RecommendedPage;