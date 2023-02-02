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
router.get("/",isLoggedIn, userController.getById);
router.patch("/", isLoggedIn,validator(schema.patchUser), userController.pacthById);
router.patch("/withdrawal",isLoggedIn, userController.withdrawalById);
router.delete("/",isLoggedIn, userController.deleteById);
router.post("/image",isLoggedIn, imageUploader.single("profile"), userController.updateProfile);
router.delete("/image",isLoggedIn, userController.deleteProfile);

export default router;
