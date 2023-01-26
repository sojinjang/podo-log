import { Router } from "express";
import { diaryController } from "./diary-controller";
import validator, { ValidationSource } from "../../utils/validator";
import schema from "./schema";

const router = Router();
router.post("/", validator(schema.createDiary), diaryController.create);
router.patch(
  "/:diaryId",
  validator(schema.diaryId, ValidationSource.PARAM),
  validator(schema.patchDiary),
  diaryController.pacthById
);
// router.delete("/:diaryId", validator(schema.diaryId, ValidationSource.PARAM), diaryController);

export default router;
