import express from "express";
import users from "./users";
import login from "./login";

const router = express.Router();

router.use("/users", users);
router.use("/login", login);

export default router;
