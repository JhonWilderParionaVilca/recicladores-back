import { NextFunction, Request, Response } from "express";
import { ApplicationError, logger, SuccesResponse } from "../../shared";
import { BodyRequestRegister } from "../entities";
import { registerUserService } from "../services/register.service";

export const registerUserController = async (
  req: Request<{}, {}, BodyRequestRegister>,
  res: Response<SuccesResponse>,
  next: NextFunction
) => {
  try {
    const { name, email, password, role } = req.body;

    const userCreated = await registerUserService({
      name,
      email,
      password,
      role,
    });

    res.status(200).json({
      data: userCreated,
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
