import { Router } from "express";
import { diaryController } from "./diary-controller";
import validator, { ValidationSource } from "../../utils/validator";
import schema from "./schema";
import { imageUploader } from "../../middlewares";

const router = Router();
router.post(
  "/",
  validator(schema.createDiary),
  imageUploader.single("picture"),
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

router.post("/image/:diaryId", imageUploader.single("picture"), diaryController.updatePicture);
router.delete("/image/:diaryId", diaryController.deletePicture);

export default router;
