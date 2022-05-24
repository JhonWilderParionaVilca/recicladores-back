import {
  ApplicationError,
  createAuthToken,
  isValidPassword,
} from "../../shared";
import { findOneResourceByField } from "../../shared/factory/findOneResourceByField";
import { User, UserModel, UserMongoose } from "../entities";

export const loginUserService = async ({
  email,
  password,
}: User): Promise<string> => {
  try {
    const user: UserMongoose = await findOneResourceByField(UserModel)({
      email,
    });
    if (!user) {
      throw new ApplicationError(
        "Usuario o contraseña incorrecto",
        "auth",
        "loginUserService-findOneResourceByField",
        400
      );
    }
    // comparar password
    const isValid = await isValidPassword(password, user.password);
    if (!isValid) {
      throw new ApplicationError(
        "Usuario o contraseña incorrecto",
        "auth",
        "loginUserService-isValidPassword",
        400
      );
    }

    const jwt = createAuthToken({
      // eslint-disable-next-line no-underscore-dangle
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    return jwt;
  } catch (error: any) {
    throw new ApplicationError(
      error.message,
      error.errorType,
      error.fn,
      error.statusCode
    );
  }
};
