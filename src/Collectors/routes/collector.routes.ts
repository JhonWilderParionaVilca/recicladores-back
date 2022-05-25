import { Router } from "express";
import { requestValidator } from "../../shared";
import { userTokenVerification } from "../../shared/middlewares/auth/userTokenVerification";
import { uploadImagesMiddleware } from "../../shared/middlewares/upload/uploadImagesMiddleware";
import { createCollectorController } from "../controllers/createCollector.controller";
import { nearCollectorController } from "../controllers/nearCollector.controller";
import { createCollectorValidator } from "../validators/createCollector.validator";
import { nearCollectorValidator } from "../validators/nearCollectors.validator";

const router: Router = Router();

router.post(
  "/",
  [
    userTokenVerification,
    uploadImagesMiddleware("image"),
    requestValidator(createCollectorValidator),
  ],
  createCollectorController
);

router.get(
  "/",
  [requestValidator(nearCollectorValidator)],
  nearCollectorController
);

export default router;
