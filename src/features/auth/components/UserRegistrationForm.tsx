import styles from "../../../shared/styles/ParkingForm.module.css";
import { Box, CircularProgress, FormControl, FormHelperText, InputLabel, Link, MenuItem, Select, Typography } from "@mui/material";
import AuthFormContainer from "./AuthFormContainer";
import { FormUserValues, UserRegistrationFormProps,  } from "../types";
import { grey } from "@mui/material/colors";
import ButtonPrimary from "../../../shared/ui/components/ButtonPrimary";
import { FieldsType } from "../../../shared/types";
import InputForm from "../../../shared/ui/components/InputForm";

const fields: FieldsType[] = [
  { name: "username", placeholder: "Nombre", type: "text" },
  { name: "contactPhone", placeholder: "Teléfono", type: "text" },
  { name: "email", placeholder: "Correo", type: "email" },
  { name: "password", placeholder: "Contraseña", type: "password" },
  { name: "confirmPassword", placeholder: "Repetir Contraseña", type: "password"},
];

const UserRegistrationForm = ({
  register,
  errors,
  isLoading,
  errorMessage,
}: UserRegistrationFormProps) => {
  return (
    <AuthFormContainer
      title="Regístrate"
      register="Crea tu cuenta para que tu estacionamemiento sea visible."
      google="Registrate"
    >
      <Box className={styles.registerForm}>
        {fields.map(({ name, placeholder, type }) => (
          <InputForm
            key={name}
            name={name}
            placeholder={placeholder ?? ""}
            type={type}
            register={register}
            error={errors[name as keyof FormUserValues]}
          />
        ))}
        <FormControl fullWidth sx={{ my: 2 }} error={!!errors.role}>
          <InputLabel id="role-select-label">Rol</InputLabel>
          <Select
            labelId="role-select-label"
            id="role-select"
            defaultValue=""
            {...register("role")}
            label="Rol"
            sx={{
              '& .MuiInputBase-input': {
                padding: '12px', 
              },
            }}
          >
            <MenuItem value="OWNER">Dueño</MenuItem>
            <MenuItem value="DRIVER">Conductor</MenuItem>
          </Select>
          {errors.role && (
            <FormHelperText>{errors.role.message as string}</FormHelperText>
          )}
        </FormControl>

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
        
        <ButtonPrimary
          text={isLoading ? <CircularProgress size={25}/> : "Continuar"}
          type="submit"
          disabled={isLoading}
        />
        {errorMessage && (
          <Typography variant="body2" color="error" sx={{py:1 }}>
            {errorMessage}
          </Typography>
        )}
      </Box>
    </AuthFormContainer>
  );
};

export default UserRegistrationForm;
