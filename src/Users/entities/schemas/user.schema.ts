import { Schema } from "mongoose";
import { USER_ROLES } from "../../../constants/roles";
import type { User } from "../types/users";

export const UserSchema = new Schema<User>({
  name: {
    type: String,
    required: [true, "name is required"],
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    minlength: [8, "La contraseña debe de ser mínimo 8 caracteres"],
  },
  role: {
    type: String,
    enum: USER_ROLES,
    default: "recycler",
  },
});
