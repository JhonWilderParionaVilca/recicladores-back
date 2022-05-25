import type { NextFunction, Request, Response } from "express";
import { ApplicationError, logger, SuccesResponse } from "../../shared";
import {
  uploadImagecloudinaryService,
  destroyImageCloudinaryService,
} from "../../shared/services/uploadImageToCloudinary";
import type { BodyRequestCreateCollector } from "../entities/types/collector";
import { createCollectorService } from "../services/createCollector.service";

export const createCollectorController = async (
  req: Request<{}, {}, BodyRequestCreateCollector>,
  res: Response<SuccesResponse>,
  next: NextFunction
) => {
  let imgDeleted;
  try {
    if (!req.file) {
      throw new ApplicationError(
        "No se envió la imagen",
        "multer",
        "req.file",
        404
      );
    }
    const { secure_url } = await uploadImagecloudinaryService(req.file!);
    imgDeleted = secure_url;

    const { userId } = req;
    const { name, email, phone, items, latitude, longitude } = req.body;

    const collectorCreated = await createCollectorService({
      name,
      image_url: secure_url,
      email,
      phone,
      items,
      latitude,
      longitude,
      createdBy: userId,
    });

    res.status(200).json({
      data: collectorCreated,
      msg: "created",
      status: true,
    });
  } catch (error: any) {
    await destroyImageCloudinaryService(imgDeleted);

    logger.error(`error creating user`, {
      instance: error.fn,
      service: error.service,
      trace: error.message,
    });

    next(
      new ApplicationError(
        error.message.includes("E1100")
          ? "El correo ya tiene un usuario creado"
          : error.message,
        error.errorType || "controller",
        error.service,
        error.statusCode
      )
    );
  }
};
