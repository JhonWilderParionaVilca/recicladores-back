import type { NextFunction, Request, Response } from "express";
import type { QueryRequestNearCollector } from "../entities/types/collector";
import { ApplicationError, logger, SuccesResponse } from "../../shared";
import { nearCollectorService } from "../services/nearCollector.service";

export const nearCollectorController = async (
  req: Request<{}, {}, {}, QueryRequestNearCollector>,
  res: Response<SuccesResponse>,
  next: NextFunction
) => {
  try {
    const { items, latitude, longitude } = req.query;
    const nearCollectors = await nearCollectorService({
      items,
      latitude,
      longitude,
    });
    res.status(200).json({
      data: nearCollectors,
      msg: "search",
      status: true,
    });
  } catch (error: any) {
    logger.error(`error search near collector`, {
      instance: error.fn,
      service: error.service,
      trace: error.message,
    });

    next(
      new ApplicationError(
        error.message,
        error.errorType || "controller",
        error.service,
        error.statusCode
      )
    );
  }
};
