import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { logger, ApplicationError } from "..";

export const requestValidator =
  (schema: yup.ObjectSchema<any>) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      return next();
    } catch (error: any) {
      logger.error(`error validating body request ${error.message}`, {
        instance: "yup validator",
        fn: "requestValidator",
        trace: error.message,
      });

      return next(
        new ApplicationError(
          error.message,
          "validation",
          "requestValidator",
          400
        )
      );
    }
  };
