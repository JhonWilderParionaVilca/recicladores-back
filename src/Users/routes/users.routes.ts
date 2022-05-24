import { Router } from "express";
import { requestValidator } from "../../shared";
import { loginUser } from "../controllers/login.controller";
import { registerUserController } from "../controllers/register.controller";
import { registerUserValidator, loginUserValidator } from "../validators";

const router: Router = Router();

router.post(
  "/register",
  [requestValidator(registerUserValidator)],
  registerUserController
);
router.post("/login", [requestValidator(loginUserValidator)], loginUser);

export default router;
