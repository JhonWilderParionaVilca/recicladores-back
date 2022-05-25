import { ApplicationError, encryptPassword } from "../../shared";
import { createResource } from "../../shared/factory/createResource";
import { User, UserModel } from "../entities";
import { UserMongoose } from "../entities/types/users";

export const registerUserService = async ({
  name,
  email,
  password,
  role,
}: User): Promise<UserMongoose> => {
  try {
    const encriptedPassword = await encryptPassword(password);
    const newUser: UserMongoose = await createResource(UserModel)({
      name,
      email,
      password: encriptedPassword,
      role,
    });
    return newUser;
  } catch (error: any) {
    throw new ApplicationError(
      error.message,
      error.errorType,
      error.fn,
      error.statusCode
    );
  }
};
