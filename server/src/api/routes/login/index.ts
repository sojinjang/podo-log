import { Router } from "express";
import { LoginController } from "./login.controller";
import validator, { ValidationSource } from "../../../utils/validator";
import schema from "./login.validation";

const router = Router();
const loginController: LoginController = new LoginController();
router.post("/local", validator(schema.local), loginController.local);
router.post(
  "/logout",
  validator(schema.auth, ValidationSource.HEADER),
  loginController.logout
);
router.get("/kakao", loginController.kakao);
router.get("/kakao/oauth", loginController.kakaoCallback);
router.get("/naver", loginController.naver);
router.get("/naver/oauth", loginController.naverCallback);
router.post("/silent-refresh", loginController.silentRefresh);

export default router;
