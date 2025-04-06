import { Box, TextField, } from "@mui/material";
import { FieldsType, FormParkingValues, ParkingFormProps } from "../types";
import styles from "../Auth.module.css";
import ButtonPrimary from "../../../shared/ui/components/ButtonPrimary";
import ButtonSecondary from "../../../shared/ui/components/ButtonSecondary";
import ParkingBannerForm from "./ParkingBannerForm";


const fields: FieldsType[] = [
  { name: "totalSpots", label: "Contraseña", type: "number" },
  { name: "availableSpots", label: "Plazas disponibles", type: "number",},
  { name: "hourlyRate", label: "Tarifa por hora", type: "number"}
];

const ParkingRegistrationStep = ({ register, errors }: ParkingFormProps) => {
 
  return (
    <>
      <ParkingBannerForm />
      
        <Box
          className={styles.registerForm}
        >
           {fields.map(({ name, label, type }) => (
            <TextField
            key={name}
            {...register(name as keyof FormParkingValues)}
            name={name}
            label={label}
            type={type}
            error={!!errors[name as keyof FormParkingValues]}
            helperText={errors[name as keyof FormParkingValues]?.message}
            fullWidth
            />
          ))}
        
        <ButtonPrimary text="Continuar" type="submit" />
        <ButtonSecondary text="Cancelar" />
      </Box>
    </>
  );
};

export default ParkingRegistrationStep;
