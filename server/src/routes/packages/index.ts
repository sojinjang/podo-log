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
router.post(
  "/:packageId",
  validator(schema.packageId, ValidationSource.PARAM),
  packageController.buyPackage
);
router.get(
  "/:packageId",
  validator(schema.packageId, ValidationSource.PARAM),
  packageController.getStickersByPackageId
);
router.get("/mine", packageController.getMyPackage);
router.get("/shop", packageController.getPackageInshop);

router.delete(
  "/:packageId",
  validator(schema.packageId, ValidationSource.PARAM),
  packageController.deletePackage
);

export default router;
