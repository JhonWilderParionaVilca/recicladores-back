import * as yup from "yup";
import { USER_ROLES } from "../../constants/roles";

export const bodyRequestRegisterYup = yup.object({
  name: yup.string().lowercase().trim().required("El nombre es requerido"),
  email: yup
    .string()
    .lowercase()
    .trim()
    .email("Debe ingresar un email válido")
    .required("El correo es requerido"),
  password: yup
    .string()
    .min(8, "El password debe ser de al menos 8 caracteres")
    .required("La contraseña es requerida"),
  passwordConfirmation: yup
    .string()
    .required("La confirmación de contraseña es requerida")
    .oneOf([yup.ref("password"), null], "La contraseña no coincide"),
  role: yup.string().oneOf(USER_ROLES, "rol no existe"),
});

export const registerUserValidator = yup.object({
  body: bodyRequestRegisterYup,
});
