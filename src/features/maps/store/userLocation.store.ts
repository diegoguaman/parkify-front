// src/store/userLocation.store.ts
import { create } from 'zustand';

interface Location {
  lat: number;
  lng: number;
}

interface UserLocationStore {
  location: Location | null;
  setLocation: (loc: Location) => void;
}

export const useUserLocationStore = create<UserLocationStore>((set) => ({
  location: null,
  setLocation: (loc) => set({ location: loc }),
}));
