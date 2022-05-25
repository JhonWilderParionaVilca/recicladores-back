import { NextFunction, Request, Response } from "express";
import { MulterError } from "multer";
import { uploadFileOnMemory } from "../../../config/multer";
import { ApplicationError } from "../../customErrors/AplicationError";

export const uploadImagesMiddleware =
  (nameField: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    uploadFileOnMemory(nameField)(req, res, (err) => {
      if (err instanceof MulterError) {
        next(
          new ApplicationError(
            "Not image file",
            "multer",
            "uploadImageMiddeware",
            400
          )
        );
      } else if (err) {
        next(
          new ApplicationError(
            err.message,
            "multer",
            "uploadImageMiddeware",
            400
          )
        );
      }
      next();
    });
  };
