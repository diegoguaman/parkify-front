import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormParkingValues, FormRegisterValues } from "../../features/auth/types";

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
  }