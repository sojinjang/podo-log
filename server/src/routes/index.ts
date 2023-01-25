import express from "express";
import login from "./login";
import users from "./users";
import books from "./books";
import { isLoggedIn } from "./../middlewares";

const router = express.Router();

router.use("/login", login);
router.use("/users", users);
router.use("/books", isLoggedIn, books);

export default router;
