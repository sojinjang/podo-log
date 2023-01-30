import passport from "passport";
import { logger, makeRefreshToken, parseCookies } from "../../utils";
import { podologURL, cookieOption } from "../../config";
import asyncHandler from "../../utils/async-handler";
import { makeAccessToken } from "./../../utils/create-token";
import { resolve } from "path";

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

        const refreshToken = makeRefreshToken(user.userId);
        res
          .status(200)
          .cookie("refreshToken", refreshToken, cookieOption(14, "d"))
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

        const refreshToken = makeRefreshToken(user.userId);
        res
          .status(200)
          .cookie("refreshToken", refreshToken, cookieOption(14, "d"))
          .redirect(`${podologURL}`);
      });
    })(req, res, next);
  });

  silentRefresh = asyncHandler(async (req, res, next) => {
    let cookies = null;
    if (req && req.headers.cookie) {
      cookies = parseCookies(req.headers.cookie);
    }
    const refreshToken = cookies?.refreshToken;
    console.log(refreshToken);
    //리프레시 검증 후

    // if(검증 토큰.id){
    //   const accessToken = makeAccessToken(검증 토큰.id)
    //   const result={message:"refresh 성공", accessToken}
    //   res.status(200).json(result)
    // }
    res.status(200).json({ accessToken: "test" });
  });
}

export const loginController = new LoginController();
