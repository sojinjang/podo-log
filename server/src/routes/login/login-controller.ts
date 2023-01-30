import passport from "passport";
import { logger, makeRefreshToken, makeAccessToken } from "../../utils";
import { podologURL, cookieOption } from "../../config";
import asyncHandler from "../../utils/async-handler";

class LoginController {
  local = asyncHandler(async (req, res, next) => {
    passport.authenticate("local", (authError, user, info) => {
      if (authError) {
        logger.error(authError);
        res.status(401).json({ loginError: authError.message });
      }
      if (!user) {
        logger.info(info.message);
        res.status(401).json({ loginError: info.message });
      }
      return req.login(user, { session: false }, (loginError) => {
        if (loginError) {
          logger.error(loginError);
          return next(loginError);
        }

        const refreshToken = makeRefreshToken(user.userId);
        const accessToken = makeAccessToken(user.userId);
        const result = { message: "로그인 성공", accessToken };
        res
          .status(200)
          .cookie("refreshToken", refreshToken, cookieOption(14, "d"))
          .json(result);
      });
    })(req, res, next);
  });

  logout = asyncHandler(async (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
    });
    res.clearCookie("refreshToken");
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
        res.status(401).redirect(`${podologURL}?loginError=${authError.message}`);
      }
      if (!user) {
        logger.info(info.message);
        res.status(401).redirect(`${podologURL}?loginError=${info.message}`);
      }
      return req.login(user, { session: false }, (loginError) => {
        if (loginError) {
          logger.error(loginError);
          res.status(401).redirect(`${podologURL}?loginError=${loginError.message}`);
        }

        const refreshToken = makeRefreshToken(user.userId);
        res
          .status(200)
          .cookie("refreshToken", refreshToken, cookieOption(14, "d"))
          .redirect(`${podologURL}`);
      });
    })(req, res, next);
  });

  silentRefresh = asyncHandler(async (req, res, next) => {
    passport.authenticate("refreshJwt", (authError, user, info) => {
      if (authError) {
        logger.error(authError);
        res.status(401).json({ error: authError.message });
      }
      if (!user) {
        logger.info(info.message);
        res.status(401).json({ error: info.message });
      }
      return req.login(user, { session: false }, (loginError) => {
        if (loginError) {
          logger.error(loginError);
          res.status(401).redirect(`${podologURL}?loginError=${loginError.message}`);
        }

        const accessToken = makeAccessToken(user.userId);
        const result = { message: "refresh 성공", accessToken };
        res.status(200).json(result);
      });
    })(req, res, next);
  });
}

export const loginController = new LoginController();
