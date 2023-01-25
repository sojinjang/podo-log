import { Router } from "express";
import { bookController } from "./book-controller";
import validator, { ValidationSource } from "../../utils/validator";
import schema from "./schema";

const router = Router();

router.post("/", validator(schema.createBook), bookController.create);
router.get("/", bookController.getByUserId);
// router.patch("/:bookId", validator(schema.patchBook), bookController);
// router.delete("/:bookId", bookController);

export default router;
