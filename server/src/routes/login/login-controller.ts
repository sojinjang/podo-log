import passport from "passport";
import { logger } from "../../utils";
import jwt from "jsonwebtoken";
import { jwtSecretKey, accessTokenTime, podologURL, cookieOption } from "../../config";
import asyncHandler from "../../utils/async-handler";

class LoginController {
  local = asyncHandler(async (req, res, next) => {
    passport.authenticate("local", (authError, user, info) => {
      if (authError) {
        logger.error(authError);
        res.redirect(`${podologURL}?loginError=${authError.message}`);
      }
      if (!user) {
        logger.info(info.message);
        res.redirect(`${podologURL}?loginError=${info.message}`);
      }
      return req.login(user, { session: false }, (loginError) => {
        if (loginError) {
          logger.error(loginError);
          return next(loginError);
        }

        const accessToken = jwt.sign({ userId: user.userId }, jwtSecretKey, {
          expiresIn: accessTokenTime,
        });
        res
          .status(200)
          .cookie("accessToken", accessToken, cookieOption(1, "h"))
          .redirect(`${podologURL}`);
      });
    })(req, res, next);
  });

  logout = asyncHandler(async (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
    });
    res.clearCookie("loginToken");
    res.status(200).json({
      result: "success",
      message: "로그아웃 성공",
    });
  });

  kakao = asyncHandler(async (req, res, next) => {
    passport.authenticate("kakao")(req, res, next);
  });

  kakaoCallback = asyncHandler(async (req, res, next) => {
    passport.authenticate("kakao", (authError, user, info) => {
      if (authError) {
        logger.error(authError);
        res.redirect(`${podologURL}?loginError=${authError.message}`);
      }
      if (!user) {
        logger.info(info.message);
        res.redirect(`${podologURL}?loginError=${info.message}`);
      }
      return req.login(user, { session: false }, (loginError) => {
        if (loginError) {
          logger.error(loginError);
          res.redirect(`${podologURL}?loginError=${loginError.message}`);
        }

        const accessToken = jwt.sign({ userId: user.userId }, jwtSecretKey, {
          expiresIn: accessTokenTime,
        });

        return res
          .status(200)
          .cookie("accessToken", accessToken, cookieOption(1, "h"))
          .redirect(`${podologURL}`);
      });
    })(req, res, next);
  });
}

export const loginController = new LoginController();
