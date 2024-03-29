import express from "express";
import login from "./login";
import users from "./users";
import books from "./books";
import diaries from "./diaries";
import comments from "./comments";
import packages from "./packages";
import { isLoggedIn } from "../middlewares";

const router = express.Router();

router.use("/login", login);
router.use("/users", users);
router.use("/books", isLoggedIn, books);
router.use("/diaries", isLoggedIn, diaries);
router.use("/comments", isLoggedIn, comments);
router.use("/packages", isLoggedIn, packages);

export default router;
