import mongoose from "mongoose";
import Logger from "../shared/logger/appLogger";

export const dbConection = (): void => {
  try {
    mongoose.connect(`${process.env.MONGO_URI}`);
    mongoose.connection.on("error", (_) => {
      throw new Error("error connecting database");
    });
    mongoose.connection.once("connected", () =>
      Logger.info("Database Succesfully Connected!")
    );
  } catch (error) {
    throw new Error("error connecting database");
  }
};
