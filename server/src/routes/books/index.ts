import { Router } from "express";
import { bookController } from "./book-controller";
import validator, { ValidationSource } from "../../utils/validator";
import schema from "./schema";
import { getDiariesRouter } from "../diaries";

const router = Router();

router.post("/", validator(schema.createBook), bookController.create);
router.get("/", bookController.getByUserId);
router.use(
  "/:bookId/diaries",
  validator(schema.bookId, ValidationSource.PARAM),
  getDiariesRouter
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

export default router;
