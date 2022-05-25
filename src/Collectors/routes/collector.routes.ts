import { Router } from "express";
import { requestValidator } from "../../shared";
import { createCollectorController } from "../controllers/createCollector.controller";
import { createCollectorValidator } from "../validators/createCollector.validator";

const router: Router = Router();

router.post(
  "/",
  [requestValidator(createCollectorValidator)],
  createCollectorController
);

export default router;
