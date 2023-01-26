import { Router } from "express";
import { diaryController } from "./diary-controller";
import validator, { ValidationSource } from "../../utils/validator";
import schema from "./schema";

export const getDiariesRouter = Router();
getDiariesRouter.get("/", diaryController.getByBookId);

const router = Router();
router.post("/", validator(schema.createDiary), diaryController.create);
// router.get("/", diaryController);
// router.patch(
//   "/:diaryId",
//   validator(schema.diaryId, ValidationSource.PARAM),
//   validator(schema.patchDiary),
//   diaryController
// );
// router.delete("/:diaryId", validator(schema.diaryId, ValidationSource.PARAM), diaryController);

export default router;
