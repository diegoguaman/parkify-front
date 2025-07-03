import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FormRegisterValues } from "../../features/auth/types";
import { AccessType } from "./types";


export type FormParkingValues = {
  parkingName: string;
  parkingAddress: string;
  parkingPhone: string;

  imageParking?: File | null;      // archivo cargado por el usuario
  imageUrl?: string;            // URL ya subida

  totalSpots: number;
  availableSpots: number;

  extraFeatures?: string[];   
  ratingAvg?: number;
  ratingCount?: number;

  lat: number;
  lng: number;

  accessType?: AccessType;
  accessInstructions?: string;
};
// export type FormParkingValues = {
//   imageParking?: File | null;
//   parkingImageUrl?: string;
//   email: string;
//   totalSpots: number;
//   hourlyRate: number;
//   openTime: string;
//   closeTime: string;
//   parkingName: string;
//   parkingAddress: string;
//   parkingPhone: string;
// };

export interface FieldsType {
    name: keyof FormRegisterValues;
    placeholder?: string;
    label?: string;
    type: string;
}
export interface RequiredLabelField {
    name: string;
    label: string; 
    type: string;
  };
  export interface ParkingDataFieldsProps {
      fields: RequiredLabelField[];
      register: UseFormRegister<FormParkingValues>;
      errors: FieldErrors<FormParkingValues>;
      setValue: UseFormSetValue<FormParkingValues>;
      mode?: "register" | "edit";
  }