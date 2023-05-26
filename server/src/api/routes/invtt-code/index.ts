import { Router } from "express";
import { InvttCodeController } from "./invtt-code.controller";
import validator, { ValidationSource } from "../../../utils/validator";
import schema from "./invtt-code.validation";
import { Container } from "typedi";

const router = Router();
const invttCodeController: InvttCodeController = Container.get(InvttCodeController);

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
