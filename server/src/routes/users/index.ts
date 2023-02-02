import { Router } from "express";
import { userController } from "./user-controller";
import validator, { ValidationSource } from "../../utils/validator";
import schema from "./schema";
import { isLoggedIn, imageUploader } from "../../middlewares";

const router = Router();
const loginedRouter = Router();
router.use("/", isLoggedIn, loginedRouter);

router.post(
  "/",
  imageUploader.single("profile"),
  validator(schema.localJoin),
  userController.localJoin
);
loginedRouter.get("/", userController.getById);
loginedRouter.patch("/", validator(schema.patchUser), userController.pacthById);
loginedRouter.patch("/withdrawal", userController.withdrawalById);
loginedRouter.delete("/", userController.deleteById);
loginedRouter.post("/image", imageUploader.single("profile"), userController.updateProfile);
loginedRouter.delete("/image", userController.deleteProfile);

export default router;
