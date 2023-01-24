import { Router } from "express";
import { loginController } from "./login-controller";
import validator, { ValidationSource } from "../../utils/validator";
import schema from "./schema";

const router = Router();

router.post("/local", validator(schema.local), loginController.local);
router.post("/logout", validator(schema.auth), loginController.logout);
router.get("/kakao", loginController.kakao);
router.get("/kakao/oauth", loginController.kakaoCallback);

export default router;
