import cloudinary from "cloudinary";
import { ApplicationError } from "../customErrors/AplicationError";
import { bufferFormat } from "../utils/bufferFormat";

export const uploadImagecloudinaryService = async (
  // eslint-disable-next-line no-undef
  image: Express.Multer.File
): Promise<{ secure_url: string; public_id: string }> => {
  try {
    const { content } = bufferFormat(image);
    const { secure_url, public_id } = await cloudinary.v2.uploader.upload(
      content!
    );
    return { secure_url, public_id };
  } catch (error: any) {
    throw new ApplicationError(
      error.message,
      error.errorType,
      "uploadImageToCloudService",
      400
    );
  }
};

export const destroyImageCloudinaryService = async (
  url_image: string | undefined
) => {
  try {
    if (url_image) {
      const urlSplit = url_image.split("/");
      const public_id = urlSplit[urlSplit.length - 1].split(".")[0];
      await cloudinary.v2.uploader.destroy(public_id);
    }
  } catch (error: any) {
    throw new ApplicationError(
      error.message,
      error.errorType,
      "destroyImageCloudinaryService",
      400
    );
  }
};
