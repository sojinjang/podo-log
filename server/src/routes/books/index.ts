import { Router } from "express";
import invttCodeRouter from "../invtt-code";
import { bookController } from "./book-controller";
import validator, { ValidationSource } from "../../utils/validator";
import schema from "./schema";
import { diaryController } from "../diaries/diary-controller";
import { isBookMember } from "../../middlewares";

const router = Router();
router.post("/", validator(schema.createBook), bookController.create);
router.get("/", bookController.getByUserId);
router.get(
  "/:bookId/members",
  validator(schema.bookId, ValidationSource.PARAM),
  isBookMember,
  bookController.getMembers
);
router.get(
  "/:bookId/diaries",
  validator(schema.bookId, ValidationSource.PARAM),
  validator(schema.getPage, ValidationSource.QUERY),
  isBookMember,
  diaryController.getByBookId
);

router.get(
  "/:bookId/diaries/:diaryId",
  validator(schema.getByDiaryId, ValidationSource.PARAM),
  isBookMember,
  diaryController.getByDiaryId
);

router.patch(
  "/:bookId",
  validator(schema.bookId, ValidationSource.PARAM),
  validator(schema.patchBook),
  isBookMember,
  bookController.pacthById
);
router.delete(
  "/:bookId",
  validator(schema.bookId, ValidationSource.PARAM),
  bookController.outBookById
);

router.use("/", invttCodeRouter);

export default router;
