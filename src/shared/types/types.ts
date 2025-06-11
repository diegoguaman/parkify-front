export type AccessType = 'QR_CODE' | 'PIN_CODE' | 'MANUAL_CONTACT' | 'OTHER';

export interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  pricePerHour: number;
  recurrenceType: string;
  specificDays: number[];
  overnight: boolean;
}

export interface Parking {
  id: string;
  ownerId: number;
  parkingName: string;
  parkingAddress: string;
  parkingPhone: string;
  imageUrl: string;
  totalSpots: number;
  availableSpots: number;
  extraFeatures: string[];
  ratingAvg: number;
  ratingCount: number;
  lat: number;
  lng: number;
  accessType: AccessType;
  accessInstructions: string;
  shift: Shift[];
  isOpen: boolean; 
}

export type NearbyParking = Omit<
  Parking,
  'ownerId' | 'accessType' | 'accessInstructions' | 'shift'
> & {
  distance: number;
};