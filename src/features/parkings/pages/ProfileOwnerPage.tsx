import { Box } from "@mui/material";
import { showError, showSuccess } from "../../../shared/ui/toast";
import HeaderForm from "../../../shared/ui/components/HeaderForm";
import { updateParking } from "../services/ParkingService";
import { useParkingStore } from "../../../store/parking.store";
import { FormParkingValues } from "../../../shared/types";
import ParkingEmptyState from "../components/ParkingEmptyState";
import ParkingFormContainer from "../components/ParkingFormContainer";
import { useScrollToHeader } from "../../../shared/hooks/useScrollToHeader";
import { useEffect, useState } from "react";
import { handleError } from "../../../shared/utils/handleError";
import { AxiosError } from "axios";
import { Parking } from "../../../shared/types/types";
// import { useAuthStore } from "../../../store/auth.store";
// import { updateUserEmail } from "../../auth/services/AuthService";

//mapea de un parking a un FormParkingValues
const mapParkingToFormValues = (parking: Parking): FormParkingValues => ({
  parkingName: parking.parkingName,
  parkingAddress: parking.parkingAddress,
  parkingPhone: parking.parkingPhone,

  imageParking: null,                 // nuevo archivo (vacío por defecto)
  imageUrl: parking.imageUrl,     // ya subida

  totalSpots: parking.totalSpots,
  availableSpots: parking.availableSpots,

  extraFeatures: parking.extraFeatures ?? [],
  ratingAvg: parking.ratingAvg,
  ratingCount: parking.ratingCount,

  lat: parking.lat,
  lng: parking.lng,

  accessType: parking.accessType,
  accessInstructions: parking.accessInstructions,
});

const ProfileOwnerPage = () => {
  const scrollToHeader = useScrollToHeader();
  const setParkingData = useParkingStore((state) => state.setParkingData);
  const parkingData = useParkingStore((state) => state.parking);
  //const setAvailability = useParkingStore((state) => state.setAvailability)
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 
  const [isLoading, setIsLoading] = useState(false);
  const parking = useParkingStore((state) => state.parking)
  const id = useParkingStore((state) => state.parking.id)
  // const user = useAuthStore((state) => state.user)
  // const updateEmail = useAuthStore((state) => state.updateEmail)
  const availability = useParkingStore((state) => state.availability)
  console.log("parking", parking)
  //actualizacion de perfil
  useEffect(() => {
    console.log("Parking data actualizado:", parkingData);
  }, [parkingData]);
  const handleUpdate = async (data: FormParkingValues) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      //chequeo de totalSpots > availabilitySpots
      if (availability[id] !== undefined && data.totalSpots < availability[id]) {
        console.log("hola disponibles")
        setErrorMessage("Las plazas totales no pueden ser menor a las disponibles.");
        setIsLoading(false);
        return;
      }
      //actualizo el email si es q cambio
      // if (data.email !== user.email) {
      //   console.log("cambio el email")
      //   const resp = await updateUserEmail(data.email);
      //   updateEmail(data.email);
      //   console.log(resp, "email")
      // }
      const updatedProfile = await updateParking(data, parking, id);
      
      setParkingData(updatedProfile)
      //setAvailability(updatedProfile.id, updatedProfile.totalSpots)
      showSuccess("Los cambios se han guardado");
      console.log("Datos actualizados en el store:", updatedProfile);
      scrollToHeader(); //scroll hasta el header
      
    } catch (err) {
      const message = handleError(err as AxiosError); 
      setErrorMessage(message);
      showError("Hubo un error");
    } finally{
      setIsLoading(false)
    }
  };
 

  return (
    <Box>
      <HeaderForm path="/" />
      {parkingData.id === '' ? (
        <ParkingEmptyState />
      ) : (
        <ParkingFormContainer
          mode="edit"
          defaultValues={mapParkingToFormValues(parkingData)}
          onSubmit={handleUpdate}
          showExtraButtons
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      )}
    </Box>
  );
};

export default ProfileOwnerPage;
