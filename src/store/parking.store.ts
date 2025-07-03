import {create} from 'zustand';
import { persist } from "zustand/middleware";
//import { getNearbyParkings } from "../features/parkings/services/ParkingService";
//import useMapStore from '../features/maps/store/useMap.store';
import { NearbyParking, Parking } from '../shared/types/types';

interface ParkingAvailability {
  [parkingId: string]: number;
}

interface ParkingState {
  // Datos del parking detallado (propio o seleccionado)
  parking: Parking;
  setParkingData: (data: Partial<Parking>) => void;
  getParkingData: () => Parking;
  clearParkingData: () => void;

  // Selección de un parking (por ejemplo, desde el mapa)
  selected: Parking | null;
  setSelected: (parking: Parking) => void;

  // Disponibilidad por parkingId
  availability: ParkingAvailability;
  setAvailability: (parkingId: string, slots: number) => void;

  // Lista de parkings cercanos para mostrar en mapa/listado
  nearbyParkings: NearbyParking[];
  isLoadingNearby: boolean;
  fetchNearbyParkings: (lat: number, lon: number, radius: number) => Promise<void>;
}

const initialState: Parking = {
  id: '',
  ownerId: 0,
  parkingName: '',
  parkingAddress: '',
  parkingPhone: '',
  imageUrl: '',
  totalSpots: 0,
  availableSpots: 0,
  extraFeatures: [],
  ratingAvg: 0,
  ratingCount: 0,
  lat: 0,
  lng: 0,
  accessType: 'MANUAL_CONTACT',
  accessInstructions: '',
  shift: [],
  isOpen: false,
};

export const useParkingStore = create<ParkingState>()(
  persist(
    (set, get) => ({
      parking: initialState,
      setParkingData: (data) => set((state) => ({
        parking: { ...state.parking, ...data },
      })),
      getParkingData: () => get().parking,
      clearParkingData: () => set({ parking: initialState }),

      selected: null,
      setSelected: (parking) => set({ selected: parking }),

      availability: {},
      setAvailability: (parkingId, slots) =>
        set((state) => ({
          availability: { ...state.availability, [parkingId]: slots },
        })),

      nearbyParkings: [],
      isLoadingNearby: false,

      fetchNearbyParkings: async (lat, lon, radius) => {
        set({ isLoadingNearby: true });
        try {
          const apiItems: NearbyParking[] = await getNearbyParkings(lat, lon, radius);
          set({ nearbyParkings: apiItems });
        } finally {
          set({ isLoadingNearby: false });
        }
      },
    }),
    {
      name: 'parking-storage-v2', // muy importante cambiarlo para evitar errores con persistencia previa
      partialize: (state) => ({
        parking: state.parking,
        selected: state.selected,
        availability: state.availability,
        nearbyParkings: state.nearbyParkings,
      }),
    }
  )
);

//mock temporal de nerby parkings
export async function getNearbyParkings(
  lat: number,
  lon: number,
  radius: number
): Promise<NearbyParking[]> {
  // Simula un pequeño delay
  await new Promise((res) => setTimeout(res, 500));

  return [
    {
      id: '1',
      parkingName: 'Parking Palermo',
      parkingAddress: 'Av. Libertador 1234',
      parkingPhone: '1134567890',
      imageUrl: 'https://source.unsplash.com/400x200/?parking',
      totalSpots: 20,
      availableSpots: 5,
      lat: lat + 0.001,
      lng: lon + 0.001,
      ratingAvg: 4.5,
      ratingCount: 24,
      distance: 120,
      isOpen: true,
      extraFeatures: ['covered', '24h surveillance'],
    },
    {
      id: '2',
      parkingName: 'Estacionamiento Centro',
      parkingAddress: 'Calle Falsa 123',
      parkingPhone: '1123456789',
      imageUrl: 'https://source.unsplash.com/400x200/?garage',
      totalSpots: 15,
      availableSpots: 2,
      lat: lat - 0.0015,
      lng: lon - 0.001,
      ratingAvg: 3.9,
      ratingCount: 15,
      distance: 340,
      isOpen: false,
      extraFeatures: ['open-air'],
    },
  ];
}




// export interface Parking {
//   id: string;
//   imageParking: string;
//   email: string; //no iria xq ees del user
//   totalSpots: number;
//   hourlyRate: number;
//   openTime: string;
//   closeTime: string;
//   parkingName: string;
//   parkingAddress: string;
//   parkingPhone: string;
//   isParkingLoaded: boolean;
//   lat: number;
//   lng: number;
//   availableSpots?: number;
//   rating?: number;
//   distance?: number;
//   isOpen?: boolean;
//   ownerId?: string;
// }

// interface ParkingAvailability {
//   [parkingId: string]: number;
// }

// interface ParkingState {
//     parking: Parking
//     //permite la actualizacion de los campos que se desean modificar podiendo dejar  otros campos vacios
//     setParkingData:(data: Partial<Parking>) => void;
//     getParkingData: () => Parking;
//     clearParkingData: () => void;
//     // Parking seleccionado (para cuando se elige uno de una lista, por ejemplo)
//     selected: Parking | null;
//     setSelected: (parking: Parking) => void;
//     // Disponibilidad por ID de parking
//     availability: ParkingAvailability;
//     setAvailability: (parkingId: string, slots: number) => void;

//     nearbyParkings: Parking[];
//     isLoadingNearby: boolean;
//     fetchNearbyParkings: (lat: number, lon: number, radius: number) => Promise<void>;

//   }

//   const initialState : Parking = {
//     id: '',
//     imageParking: '',
//     email: '',
//     totalSpots: 0,
//     hourlyRate: 0,
//     openTime: '',
//     closeTime: '',
//     parkingName: '',
//     parkingAddress: '',
//     parkingPhone: '',
//     isParkingLoaded: false,
//     lat:0,
//     lng:0,
//     availableSpots: 0,
//     rating: 0,
//     distance: 0,
//     isOpen: false,
//     ownerId: '',
//   }

//   export const useParkingStore = create<ParkingState>()(
//     persist(
//       (set, get) => ({
//         parking: initialState,
//         setParkingData: (data) =>
//           set((state) => ({
//             parking: {
//               ...state.parking,
//               ...data,
//             },
//           })),
//         getParkingData: () => get().parking,
//         clearParkingData: () => set({ parking: initialState }),
//         selected: null,
//         setSelected: (parking) => set({ selected: parking }),

//         availability: {},
//         setAvailability: (parkingId, slots) =>
//           set((state) => ({
//             availability: {
//               ...state.availability,
//               [parkingId]: slots,
//             },
//           })),
        
//         nearbyParkings: [],
//         isLoadingNearby: false,

//         fetchNearbyParkings: async (lat, lon, radius) => {
//           set({ isLoadingNearby: true });
//           try {
//             // 1️⃣ llama al método de tu servicio
//             const apiItems = await getNearbyParkings(lat, lon, radius);

//             // 2️⃣ mapea ApiNearbyParking → Parking de tu store
//             const mapped = apiItems.map(item => ({
//               id: item.id,
//               imageParking: item.parkingImageUrl,
//               email: '',
//               totalSpots: 0,
//               hourlyRate: item.hourlyRate,
//               openTime: item.openTime || '',
//               closeTime: item.closeTime || '',
//               parkingName: item.name,
//               parkingAddress: item.address,
//               parkingPhone: item.parkingPhone,
//               isParkingLoaded: true,
//               lat: item.location.latitude,
//               lng: item.location.longitude,
//               availableSpots: item.currentAvailability,
//               rating: item.rating || 0,
//               distance: item.distance,
//               isOpen: true,
//               ownerId: item.ownerId || '',
//             }));

//             useMapStore.getState().initializeFilteredParkingsFrom(mapped);
//             // 3️⃣ guarda en el store
//             set({ nearbyParkings: mapped });
//           } finally {
//             set({ isLoadingNearby: false });
//           }
//         },
//       }),
//       {
//         name: "parking-storage",
//         partialize: (state) => ({ 
//           parking: state.parking,
//           selected: state.selected,
//           availability: state.availability,
//           nearbyParkings: state.nearbyParkings,
//         }), 
//       }
//     )
//   );
