import { Router } from "express";
import { userController } from "./user-controller";
import validator, { ValidationSource } from "../../utils/validator";
import schema from "./schema";
import { isLoggedIn } from "../../middlewares/required";

const router = Router();

router.post("/", validator(schema.localJoin), userController.localJoin);
router.get("/", isLoggedIn, userController.getById);
router.patch("/", isLoggedIn, validator(schema.patchUser), userController.pacthById);
router.patch("/withdrawal", isLoggedIn, userController.withdrawalById);
router.delete("/", isLoggedIn, userController.deleteById);

export default router;
