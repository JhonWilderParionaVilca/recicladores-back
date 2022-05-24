import { NextFunction, Request, Response } from "express";
import { ApplicationError, logger, SuccesResponse } from "../../shared";
import { BodyRequestLogin } from "../entities";
import { loginUserService } from "../services/login.service";

export const loginUser = async (
  req: Request<{}, {}, BodyRequestLogin>,
  res: Response<SuccesResponse>,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const token = await loginUserService({ email, password });

    res.status(200).json({
      data: token,
      msg: "login",
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
