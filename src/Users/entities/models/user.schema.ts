import { model } from "mongoose";
import { User } from "../types/users";
import { UserSchema } from "../schemas/user.schema";

export const UserModel = model<User>("User", UserSchema);
