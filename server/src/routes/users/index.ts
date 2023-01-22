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
router.patch(
  "/",
  validator(schema.userId, ValidationSource.PARAM),
  validator(schema.patchUser),
  asyncHandler(userController.pacthById)
);
router.patch(
  "/withdrawal",
  validator(schema.userId, ValidationSource.PARAM),
  asyncHandler(userController.withdrawalById)
);
router.delete(
  "/",
  validator(schema.userId, ValidationSource.PARAM),
  asyncHandler(userController.deleteById)
);

export default router;
