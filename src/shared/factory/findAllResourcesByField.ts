import { Model as ModelType } from "mongoose";
import { ApplicationError } from "../customErrors/AplicationError";

export const findAllResources =
  <K>(Model: ModelType<K>) =>
  async <T>(field: T, from: number = 0, limit: number = 5): Promise<any> => {
    try {
      const resources = await Model.find({ ...field });
      if (!resources || resources.length < 1) {
        throw new ApplicationError(
          "No se encontraron los recursos",
          "mongoose",
          "findAllResources",
          404
        );
      }
      return resources;
    } catch (error: any) {
      throw new ApplicationError(
        error.message || "Error find All resource",
        "mongoose",
        "findAllResources",
        error.statusCode || 500
      );
    }
  };
