import { Router } from "express";
import { diaryController } from "./diary-controller";
import validator, { ValidationSource } from "../../utils/validator";
import schema from "./schema";
import { imageUploader } from "../../middlewares";

const router = Router();
router.post(
  "/",
  validator(schema.createDiary),
  imageUploader.single("profile"),
  diaryController.create
);
router.patch(
  "/:diaryId",
  validator(schema.diaryId, ValidationSource.PARAM),
  validator(schema.patchDiary),
  diaryController.pacthById
);
router.delete(
  "/:diaryId",
  validator(schema.diaryId, ValidationSource.PARAM),
  diaryController.deleteById
);

export default router;
