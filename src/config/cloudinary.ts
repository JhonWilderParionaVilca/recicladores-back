import cloudinary from "cloudinary";
import { APP } from "../constants/app";

export const cloudinaryConfig = () =>
  cloudinary.v2.config({
    cloud_name: APP.CLOUDINARY_CLOUD_NAME,
    api_key: APP.CLOUDINARY_API_KEY,
    api_secret: APP.CLOUDINARY_API_SECRET,
    secure: true,
  });
