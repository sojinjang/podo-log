import { Router } from "express";
import { PackageController } from "./package.controller";
import validator, { ValidationSource } from "../../../utils/validator";
import schema from "./package.validation";
import { imageUploader, isAdmin } from "../../middlewares";
import { Container } from "typedi";

const router = Router();
const packageController: PackageController = Container.get(PackageController);

router.post(
  "/",
  // isAdmin,
  imageUploader("package").array("package"),
  validator(schema.createPackage),
  packageController.create
);

router.get("/mine", packageController.getMyPackage);
router.get("/shop", packageController.getPackageInshop);

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

router.delete(
  "/:packageId",
  // isAdmin,
  validator(schema.packageId, ValidationSource.PARAM),
  packageController.deletePackage
);

export default router;
