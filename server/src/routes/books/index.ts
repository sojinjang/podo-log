import { Router } from "express";
import invttCodeRouter from "../invtt-code";
import { bookController } from "./book-controller";
import validator, { ValidationSource } from "../../utils/validator";
import schema from "./schema";
import { diaryController } from "../diaries/diary-controller";

const router = Router();
router.post("/", validator(schema.createBook), bookController.create);
router.get("/", bookController.getByUserId);
router.get(
  "/:bookId/members",
  validator(schema.bookId, ValidationSource.PARAM),
  bookController.getMembers
);
router.get(
  "/:bookId/diaries",
  validator(schema.bookId, ValidationSource.PARAM),
  validator(schema.getPage, ValidationSource.QUERY),
  diaryController.getByBookId
);
router.patch(
  "/:bookId",
  validator(schema.bookId, ValidationSource.PARAM),
  validator(schema.patchBook),
  bookController.pacthById
);
router.delete(
  "/:bookId",
  validator(schema.bookId, ValidationSource.PARAM),
  bookController.outBookById
);

router.use("/", invttCodeRouter);

export default router;
