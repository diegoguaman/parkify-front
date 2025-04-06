import styles from "../Auth.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Link, Typography } from "@mui/material";
import InputForm from "../components/InputForm";
import { useForm } from "react-hook-form";
import { parkingSchema } from "../schemas/parkingSchema";
import { grey } from "@mui/material/colors";
import AuthFormContainer from "../components/AuthFormContainer";
import ButtonPrimary from "../../../shared/ui/components/ButtonPrimary";
import { FieldsType, ParkingFormValues } from "../types";

const fields: FieldsType[] = [
  { name: "parkingName", placeholder: "Nombre del estacionamiento", type: "text",},
  { name: "parkingAddress", placeholder: "Dirección del estacionamiento", type: "text",},
  { name: "parkingPhone", placeholder: "Número de contacto", type: "text" },
  { name: "parkingRate", placeholder: "$ Tarifa por hora", type: "number" },
  { name: "parkingCapacity", placeholder: "Cantidad de plazas disponibles", type: "number",},
];

const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ParkingFormValues>({
    resolver: yupResolver(parkingSchema),
  });
  const onSubmit = (data: ParkingFormValues) => {
    reset();
    alert("Estacionamiento registrado");
    console.log(data);
  };
  return (
    <AuthFormContainer
      title="Regístrate"
      register="Crea tu cuenta para que tu estacionamemiento sea visible."
      google="Registrate"
    >
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className={styles.registerForm}
      >
        {fields.map(({ name, placeholder, type }) => (
          <InputForm
            key={name}
            name={name}
            placeholder={placeholder}
            type={type}
            register={register}
            error={errors[name]}
          />
        ))}
        <Typography variant="body2" sx={{ color: grey[600], my: 2 }}>
          Al continuar, aceptas los{" "}
          <Link
            href="#"
            target="_blank"
            rel="noopener"
            sx={{ color: grey[600], textDecorationColor: "black" }}
          >
            términos y condiciones
          </Link>
        </Typography>
        <ButtonPrimary text="Continuar" />
      </Box>
    </AuthFormContainer>
  );
};

export default RegisterPage;
