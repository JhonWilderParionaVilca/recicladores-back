import { NextFunction, Request, Response } from "express";
import { ApplicationError } from "../../customErrors/AplicationError";
import { validateToken } from "../../utils/tokenManager";

export const userTokenVerification = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization)
      return next(
        new ApplicationError(
          "No token provided",
          "Unauthorized",
          "userTokenVerification",
          401
        )
      );

    const { id } = validateToken(authorization);

    if (!id)
      return next(
        new ApplicationError(
          "Unvalid token",
          "Unauthorized",
          "userTokenVerification",
          401
        )
      );

    req.userId = id;

    return next();
  } catch (error: any) {
    if (error.message === "jwt expired")
      return next(
        new ApplicationError(
          error.message,
          "Unauthorized",
          "userTokenVerification",
          401
        )
      );
    return next(error);
  }
};
