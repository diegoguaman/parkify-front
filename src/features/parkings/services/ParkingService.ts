import { FormParkingValues } from "../../../shared/types";
import { Parking } from "../../../shared/types/types";
import { handleError } from "../../../shared/utils/handleError";

import { ChangePasswordFormData } from "../types";
import { api } from './../../../lib/axios';
import axios, { AxiosError } from 'axios'; 

export const mapFrontToBackend = (
  formData: FormParkingValues,
  parking: {lat:number, lng:number},
  imageUrl: string
) => ({
  parkingName: formData.parkingName,
  parkingAddress: formData.parkingAddress,
  parkingPhone: formData.parkingPhone,
  imageUrl: imageUrl, // viene de Cloudinary

  totalSpots: formData.totalSpots,
  availableSpots: formData.availableSpots,

  extraFeatures: formData.extraFeatures ?? [],
  ratingAvg: formData.ratingAvg,
  ratingCount: formData.ratingCount,

  lat: parking.lat,
  lng: parking.lng,

  accessType: formData.accessType,
  accessInstructions: formData.accessInstructions,
});

// export const mapBackendToFront = (data: any, hours: any): Parking => ({
//   id: data.id,
//   imageParking: data.parkingImageUrl,
//   email: '',
//   totalSpots: data.capacity,
//   hourlyRate: data.hourlyRate,
//   openTime: hours.openTime,
//   closeTime: hours.closeTime,
//   parkingName: data.name,
//   parkingAddress: data.address,
//   parkingPhone: data.parkingPhone,
//   isParkingLoaded: false,
//   lat: data.latitude,
//   lng: data.longitude,
//   availableSpots: data.currentAvailability,
//   rating: 4,
//   ownerId: data.ownerId
// });
const parseTime = (time: string) : {openTime: string, closeTime: string}=>{
  let openTime = time.split("/")[0]
  let closeTime = time.split("/")[1]
  return{
    openTime,
    closeTime, 
  }
}

//cloudinary
export const uploadImageToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);


  try {
    // Usamos la instancia de 'api' que ya tienes configurada
    const response = await api.post(import.meta.env.VITE_CLOUDINARY_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });


    return response.data.secure_url; // Devuelve la URL de la imagen subida
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    throw new Error("Error al subir la imagen");
  }
};

// Función para Crear un parking
export async function registerParking(data: FormParkingValues, parking: {lat: number; lng: number }) {
  try {
    //let imageUrl = 'https://dimobaservicios.com/wp-content/uploads/2022/10/como-gestionar-parking.png'
    let imageUrl = ''
    if(data.imageParking){
      imageUrl = await uploadImageToCloudinary(data.imageParking);
    }
    //payload.parkingImageUrl = imageUrl;
    const payload = mapFrontToBackend(data, parking, imageUrl);
    const response = await api.post('/parkings/my', payload);
    //console.log(response.data.workingHours)
    //const hours = parseTime(response.data.workingHours)
    //console.log(mapBackendToFront(response.data, hours))
    return response.data;
    //throw new Error("Error en la registracion")
  } catch (error) {
    throw error as AxiosError; 
  }
}

export async function updateParking(data: FormParkingValues, parking: {lat: number; lng: number; }, id: string) {
  try {
    let imageUrl = data.imageUrl || '';

    if (data.imageParking) {
      imageUrl = await uploadImageToCloudinary(data.imageParking);
    }
    const payload = mapFrontToBackend(data, parking, imageUrl);
    
    console.log("Payload a enviar:", JSON.stringify(payload, null, 2));
    const response = await api.put(`/parkings/${id}`, payload);
    //console.log(response.data.workingHours)
    //const hours = parseTime(response.data.workingHours)
    //console.log(mapBackendToFront(response.data, hours))
    return response.data
    //throw new Error("Error en la registracion")
  } catch (error) {
    throw error as AxiosError; 
  }
}


export async function getMyParking() {
  try {
    const response = await api.get('/parkings/my');
    if(response.status === 200){
      //const hours = parseTime(response.data.workingHours)
      return response.data;
    } 
    
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      // Si el error es un 404, no pasa nada
      return null;
    }

    // Otros errores sí los tiramos hacia arriba
    throw error;
  }
}

//eliminar un parking
export async function deleteParking() {
  try {
    const response = await api.delete('/parkings/my');
    if(response.status === 204){
      return true
    } 
    
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      // Si el error es un 404, no pasa nada
      return null;
    }

    // Otros errores sí los tiramos hacia arriba
    throw error;
  }
}
//availability
export async function updateAvailabilityParking(id:string, spots: number) {
  try {
    const response = await api.patch(`/parkings/${id}/availability`, { availableSpots: spots });
    if(response.status === 200){
      return response.data
    } 
    
  } catch (error) {
    throw error as AxiosError; 
  }
}

// 📌 Define el tipo que devuelve tu back para cada parking cercano
// interface ApiNearbyParking {
//   id: string;
//   name: string;
//   address: string;
//   location: { latitude: number; longitude: number };
//   distance: number;
//   openTime?: string;
//   closeTime?: string;
//   rating?: number;
//   currentAvailability: number;
//   hourlyRate: number;
//   parkingPhone: string;
//   parkingImageUrl: string;
//   ownerId?: string
// }

// export async function getNearbyParkings(lat: number, lon: number, radius: number): Promise<ApiNearbyParking[]> {
//   try {
//     const { data } = await api.get<{ data: ApiNearbyParking[] }>('/parkings/nearby', {
//       params: { lat, lon, radius },
//     });
//     return data.data;
//   } catch (err) {
//     handleError(err);
//     throw err;
//   }
// }
const parkingService = {
    async changePassword(data: ChangePasswordFormData){
      //llamada api - endpoint cambiar contraseña
      console.log(data)
      return 'Contraseña modificada con éxito'
    },
    async recoveryPassword(email: string){
      //llamada api - endpoint recuperar contraseña
      console.log(email)
      return 'Enviamos un enlace de recuperación a tu correo.'
    },
   
  };
  
  export default parkingService;