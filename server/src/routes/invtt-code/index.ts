import { Router } from "express";
import { invttCodeController } from "./invtt-code-controller";
import validator, { ValidationSource } from "../../utils/validator";
import schema from "./schema";

const router = Router();

router.patch(
  "/:bookId/invtt-code",
  validator(schema.createCode, ValidationSource.PARAM),
  invttCodeController.patchInvttCode
);
router.get(
  "/:bookId/invtt-code",
  validator(schema.createCode, ValidationSource.PARAM),
  invttCodeController.getInvttCode
);
export default router;
