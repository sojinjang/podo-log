import { Router } from "express";
import { UserController } from "./user.controller";
import validator from "../../../utils/validator";
import schema from "./user.validation";
import { isLoggedIn, imageUploader } from "../../middlewares";
import { Container } from "typedi";

const router = Router();
const loginedRouter = Router();
const userController: UserController = Container.get(UserController);
router.post(
  "/",
  imageUploader().single("profile"),
  validator(schema.localJoin),
  userController.localJoin
);

router.use("/", isLoggedIn, loginedRouter);

loginedRouter.get("/", userController.getMyData);
loginedRouter.get("/grape", userController.getGrape);
loginedRouter.patch("/", validator(schema.patchUser), userController.pacthById);
loginedRouter.patch("/withdrawal", userController.withdrawalById);
loginedRouter.delete("/", userController.deleteById);
loginedRouter.post("/image", imageUploader().single("profile"), userController.updateProfile);
loginedRouter.delete("/image", userController.deleteProfile);

export default router;
