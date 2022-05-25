import { Router } from "express";
import { requestValidator } from "../../shared";
import { userTokenVerification } from "../../shared/middlewares/auth/userTokenVerification";
import { createCollectorController } from "../controllers/createCollector.controller";
import { nearCollectorController } from "../controllers/nearCollector.controller";
import { createCollectorValidator } from "../validators/createCollector.validator";
import { nearCollectorValidator } from "../validators/nearCollectors.validator";

const router: Router = Router();

router.post(
  "/",
  [userTokenVerification, requestValidator(createCollectorValidator)],
  createCollectorController
);

router.get(
  "/",
  [requestValidator(nearCollectorValidator)],
  nearCollectorController
);

export default router;
