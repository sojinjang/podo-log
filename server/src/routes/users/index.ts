import { Router } from "express";
import { userController } from "./user-controller";
import validator, { ValidationSource } from "../../utils/validator";
import schema from "./schema";
import { isLoggedIn, imageUploader } from "../../middlewares";

const router = Router();

router.post(
  "/",
  validator(schema.localJoin),
  imageUploader.single("profile"),
  userController.localJoin
);
router.get("/", isLoggedIn, userController.getById);
router.patch("/", isLoggedIn, validator(schema.patchUser), userController.pacthById);
router.patch("/withdrawal", isLoggedIn, userController.withdrawalById);
router.delete("/", isLoggedIn, userController.deleteById);
router.post("/image", imageUploader.single("profile"), userController.updateProfile);

export default router;
