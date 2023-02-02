import { Router } from "express";
import { userController } from "./user-controller";
import validator from "../../utils/validator";
import schema from "./schema";
import { isLoggedIn, imageUploader } from "../../middlewares";

const router = Router();
const loginedRouter = Router();

// router.use("/", isLoggedIn, loginedRouter);


router.post(
  "/",
  imageUploader.single("profile"),
  validator(schema.localJoin),
  userController.localJoin
);
router.get("/", userController.getById);
router.patch("/", validator(schema.patchUser), userController.pacthById);
router.patch("/withdrawal", userController.withdrawalById);
router.delete("/", userController.deleteById);
router.post("/image", imageUploader.single("profile"), userController.updateProfile);
router.delete("/image", userController.deleteProfile);

export default router;
