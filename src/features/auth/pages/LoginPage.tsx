import styles from "../Auth.module.css";
import { Box, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../schemas/loginSchema";
import InputForm from "../components/InputForm";
import AuthFormContainer from "../components/AuthFormContainer";
import ButtonPrimary from "../../../shared/ui/components/ButtonPrimary";
import { LoginFormValues } from "../types";


const LoginPage = () => {
    
      const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<LoginFormValues>({
        resolver: yupResolver(loginSchema),
      });
      const onSubmit = (data: any) => {
        reset()
        alert("Estacionamiento registrado")
        console.log(data)
      };
      const log = {
        show: true,
        description: "¿Eres nuevo?",
        link: "Regístrate aquí"
      }
  return (
    <AuthFormContainer title="Iniciar Sesión" login={log} google="Iniciar sesión">
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className={styles.registerForm}
      >
        <InputForm
          placeholder="Correo"
          name="email"
          type="email"
          register={register}
          error={errors.email}
        />
        <InputForm
          placeholder="Contraseña"
          name="password"
          type="password"
          register={register}
          error={errors.password}
        />
        <Typography component="h2" variant="body2" sx={{my:1}}>
             
              <Link
                component={RouterLink}
                to="/"
                sx={{
                  color: "black !important",
                  textDecorationColor: "black"
                }}
              >
                ¿Has olvidado tu contraseña?
              </Link>
        </Typography>
        <ButtonPrimary text="Continuar"/>
      </Box>
    </AuthFormContainer>
  );
};

export default LoginPage;
