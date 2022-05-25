import { Router } from "express";
import { requestValidator } from "../../shared";
import { createCollectorController } from "../controllers/createCollector.controller";
import { nearCollectorController } from "../controllers/nearCollector.controller";
import { createCollectorValidator } from "../validators/createCollector.validator";
import { nearCollectorValidator } from "../validators/nearCollectors.validator";

const router: Router = Router();

router.post(
  "/",
  [requestValidator(createCollectorValidator)],
  createCollectorController
);

router.get(
  "/",
  [requestValidator(nearCollectorValidator)],
  nearCollectorController
);

export default router;
