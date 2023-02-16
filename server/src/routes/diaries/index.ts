import { Router } from "express";
import { diaryController } from "./diary-controller";
import validator, { ValidationSource } from "../../utils/validator";
import schema from "./schema";
import { imageUploader, isBookMember } from "../../middlewares";

const router = Router();
router.post(
  "/",
  imageUploader().single("picture"),
  validator(schema.createDiary),
  isBookMember,
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

router.post(
  "/:diaryId/stickers",
  validator(schema.diaryId, ValidationSource.PARAM),
  validator(schema.putStickers),
  diaryController.putStickers
);

router.post(
  "/image/:diaryId",
  imageUploader().single("picture"),
  diaryController.updatePicture
);
router.delete("/image/:diaryId", diaryController.deletePicture);

export default router;
