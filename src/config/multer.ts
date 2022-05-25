/* eslint-disable no-undef */
import { Request } from "express";
import multer, { FileFilterCallback, MulterError } from "multer";

const storage = multer.memoryStorage();

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(null, false);
    cb(new MulterError("LIMIT_UNEXPECTED_FILE", "image"));
  }
};

export const uploadFileOnMemory = (nameField: string) =>
  multer({ storage, fileFilter }).single(nameField);
