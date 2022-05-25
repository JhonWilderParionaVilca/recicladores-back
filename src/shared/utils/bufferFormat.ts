/* eslint-disable no-undef */
import DatauriParser from "datauri/parser";
import path from "path";

const parser = new DatauriParser();

export const bufferFormat = (file: Express.Multer.File) =>
  parser.format(path.extname(file.originalname).toString(), file.buffer);
