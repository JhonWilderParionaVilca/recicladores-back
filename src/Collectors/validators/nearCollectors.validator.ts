import * as yup from "yup";

export const queryRequestNearCollectorYup = yup.object({
  items: yup.string().lowercase().trim().required("ingrese un item"),
  longitude: yup
    .number()
    .min(-199, "valor minimo longitud -199")
    .max(180, "valor maximo longitud 180")
    .required("la latitud es requerido"),
  latitude: yup
    .number()
    .min(-90, "valor minimo latitud -90")
    .max(90, "valor maximo de latitud 90")
    .required("La longitud es requerido"),
});

export const nearCollectorValidator = yup.object({
  query: queryRequestNearCollectorYup,
});
