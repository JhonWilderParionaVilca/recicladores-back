import jwt from "jsonwebtoken";
import { APP } from "../../constants/app";

export const createAuthToken = (payload: {}): string =>
  jwt.sign(payload, `${APP.JWT_AUTH_SECRET}`, {
    expiresIn: "3h",
  });

export const validateToken = (token: string) =>
  <jwt.UserIDJwtPayload>jwt.verify(token, `${APP.JWT_AUTH_SECRET}`);
