import { Router } from "express";
import { packageController } from "./package-controller";
import validator, { ValidationSource } from "../../utils/validator";
import schema from "./schema";
import { imageUploader, isBookMember } from "../../middlewares";

const router = Router();
router.post(
  "/",
  imageUploader.array("package"),
  validator(schema.createPackage),
  packageController.create
);
// router.patch(
//   "/:diaryId",
//   validator(schema.diaryId, ValidationSource.PARAM),
//   validator(schema.patchDiary),
//   packageController.pacthById
// );
// router.delete(
//   "/:diaryId",
//   validator(schema.diaryId, ValidationSource.PARAM),
//   packageController.deleteById
// );

// router.post(
//   "/image/:diaryId",
//   imageUploader.single("picture"),
//   packageController.updatePicture
// );
// router.delete("/image/:diaryId", packageController.deletePicture);

export default router;
