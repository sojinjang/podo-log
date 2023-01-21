import { Router } from "express";
import { userController } from "./user-controller";
import asyncHandler from "../../utils/async-handler";
import validator, { ValidationSource } from "../../utils/validator";
import schema from "./schema";

const router = Router();

router.post("/", validator(schema.localJoin), asyncHandler(userController.localJoin));
router.get(
  "/:userId",
  validator(schema.userId, ValidationSource.PARAM),
  asyncHandler(userController.getById)
);
router.patch("/", validator(schema.patchUser), asyncHandler(userController.localJoin));
router.delete("/", validator(schema.patchUser), asyncHandler(userController.localJoin));

export default router;
