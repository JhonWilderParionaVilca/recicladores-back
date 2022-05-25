import type { NextFunction, Request, Response } from "express";
import { ApplicationError, logger, SuccesResponse } from "../../shared";
import type { BodyRequestCreateCollector } from "../entities/types/collector";
import { createCollectorService } from "../services/createCollector.service";

export const createCollectorController = async (
  req: Request<{}, {}, BodyRequestCreateCollector>,
  res: Response<SuccesResponse>,
  next: NextFunction
) => {
  try {
    const { name, email, phone, items, latitude, longitude } = req.body;

    const collectorCreated = await createCollectorService({
      name,
      email,
      phone,
      items,
      latitude,
      longitude,
    });

    res.status(200).json({
      data: collectorCreated,
      msg: "created",
      status: true,
    });
  } catch (error: any) {
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
