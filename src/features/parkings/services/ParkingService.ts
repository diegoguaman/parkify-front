import { FormParkingValues } from "../../auth/types";

const parkingService = {
 
    async updateParkingProfile(data: Omit<FormParkingValues, 'imageParking'> & { imageParking: File | null }) {
        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("totalSpots", data.totalSpots.toString());
        formData.append("hourlyRate", data.hourlyRate.toString());
        formData.append("openTime", data.openTime);
        formData.append("closeTime", data.closeTime);
        formData.append("parkingName", data.parkingName);
        formData.append("parkingAddress", data.parkingAddress);
        formData.append("parkingForm", data.parkingPhone);
        if (data.imageParking) {
            formData.append("imageParking", data.imageParking);
        }

        // return axios.post("/api/parking", formData, {
        //     headers: {
        //       "Content-Type": "multipart/form-data",
        //     },
        // });

        //simulo return
        return "Cambios guardados éxitosamente"
        //throw new Error("Error simulado")
    },
  
  
  };
  
  export default parkingService;