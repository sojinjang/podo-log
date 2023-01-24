import passport from "passport";
import { logger } from "../../utils";
import jwt from "jsonwebtoken";
import { jwtSecretKey, accessTokenTime } from "../../config";
import asyncHandler from "../../utils/async-handler";

class LoginController {
  local = asyncHandler(async (req, res, next) => {
    passport.authenticate("local", (authError, user, info) => {
      if (authError) {
        logger.error(authError);
        return next(authError);
      }
      if (!user) {
        logger.info(info.message);
        const result = {
          result: "loginError",
          message: info.message,
        };
        return res.status(200).json(result);
      }
      return req.login(user, { session: false }, (loginError) => {
        if (loginError) {
          logger.error(loginError);
          return next(loginError);
        }

        const secretKey = jwtSecretKey;
        const accessToken = jwt.sign({ userId: user.userId }, secretKey, {
          expiresIn: accessTokenTime,
        });
        return res.status(200).json({
          accessToken,
          message: "로그인성공",
        });
      });
    })(req, res, next);
  });

  logout = asyncHandler(async (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
    });
    res.clearCookie("connect.sid");
    res.status(200).json({
      result: "success",
      message: "로그아웃 성공",
    });
  });

  kakao = asyncHandler(async (req, res, next) => {
    passport.authenticate("kakao")(req, res, next);
  });

  kakaoCallback = asyncHandler(async (req, res, next) => {
    passport.authenticate("kakao", { failureRedirect: "/" })(req, res, next);
  });
}

export const loginController = new LoginController();
