import { Router } from "express";
import { commentController } from "./comment-controller";
import validator, { ValidationSource } from "../../utils/validator";
import schema from "./schema";

const router = Router();
router.post("/", validator(schema.createComment), commentController.create);
router.get(
  "/",
  validator(schema.diaryId, ValidationSource.QUERY),
  commentController.getByDiaryId
);
router.patch(
  "/:commentId",
  validator(schema.commentId, ValidationSource.PARAM),
  validator(schema.patchComment),
  commentController.pacthById
);
router.delete(
  "/:commentId",
  validator(schema.commentId, ValidationSource.PARAM),
  commentController.deleteById
);

export default router;
