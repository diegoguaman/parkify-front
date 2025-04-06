import { ReactNode } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

export interface LoginFormValues {
    email: string
    password: string
}
export interface ParkingFormValues  {
    parkingName: string;
    parkingAddress: string;
    parkingPhone: string;
    parkingRate: number;
    parkingCapacity: number;
};
export interface FieldsType {
    name: keyof ParkingFormValues;
    placeholder: string;
    type: string;
}
export interface AuthLayoutProps {
    children: ReactNode;
    title: string;
    register?: string;
    login?: {
      show: boolean;
      description: string;
      link: string;
    };
    google: string
};

export interface InputFormProps {
    placeholder: string
    name: string
    type: string
    register: UseFormRegister<any>; 
    error?: FieldError;
}