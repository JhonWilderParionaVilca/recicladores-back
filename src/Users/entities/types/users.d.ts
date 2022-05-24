import { Types } from "mongoose";
import { InferType } from "yup";
import { bodyRequestLoginYup, bodyRequestRegisterYup } from "../../validators";

export interface User {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export type BodyRequestRegister = InferType<typeof bodyRequestRegisterYup>;

export type BodyRequestLogin = InferType<typeof bodyRequestLoginYup>;

export interface UserMongoose extends User {
  _id: Types.ObjectId;
}
