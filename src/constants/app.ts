export const APP = {
  PORT_SERVER: process.env.PORT || "4000",
  JWT_AUTH_SECRET: process.env.JWT_AUTH_SECRET,
  CLOUDINARY_CLOUD_NAME: `${process.env.CLOUD_NAME}`,
  CLOUDINARY_API_KEY: `${process.env.API_KEY}`,
  CLOUDINARY_API_SECRET: `${process.env.API_SECRET}`,
};
