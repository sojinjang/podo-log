import { Router } from "express";
import { invttCodeController } from "./invtt-code-controller";
import validator, { ValidationSource } from "../../utils/validator";
import schema from "./schema";

const router = Router();

router.post("/invtt-code", validator(schema.joinBook), invttCodeController.joinBook);
router.patch(
  "/:bookId/invtt-code",
  validator(schema.bookId, ValidationSource.PARAM),
  invttCodeController.patchInvttCode
);
router.get(
  "/:bookId/invtt-code",
  validator(schema.bookId, ValidationSource.PARAM),
  invttCodeController.getInvttCode
);
export default router;
