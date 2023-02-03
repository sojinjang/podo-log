import passport from "passport";
import { logger, makeRefreshToken, makeAccessToken } from "../../utils";
import { cookieOption } from "../../config";
import asyncHandler from "../../utils/async-handler";
import { AuthFailureError, InternalError } from "./../../core/api-error";
import {
  FailureLoginRedirect,
  SuccessLoginRedirectWithCookie,
  SuccessLoginResponseWithCookie,
  SuccessLogoutResponse,
  SuccessResponse,
} from "../../core/api-response";

class LoginController {
  local = asyncHandler(async (req, res, next) => {
    passport.authenticate("local", (authError, user, info) => {
      try {
        if (authError) {
          logger.error(authError);
          throw new AuthFailureError(authError.message);
        }
        if (!user) {
          logger.info(info.message);
          throw new AuthFailureError(info.message);
        }
        return req.login(user, { session: false }, (loginError) => {
          if (loginError) {
            logger.error(loginError);
            throw new InternalError(loginError);
          }

          const refreshToken = makeRefreshToken(user.userId);
          const accessToken = makeAccessToken(user.userId);
          const messageDTO = { message: "로그인 성공", data: { accessToken } };
          const setCookie = { refreshToken, option: cookieOption(14, "d") };

          return new SuccessLoginResponseWithCookie(
            messageDTO.message,
            messageDTO.data,
            setCookie
          ).send(res);
        });
      } catch (err) {
        next(err);
      }
    })(req, res, next);
  });

  logout = asyncHandler(async (req, res, next) => {
    const messageDTO = { message: "로그아웃 성공" };
    return new SuccessLogoutResponse(messageDTO.message).send(res);
  });

  kakao = asyncHandler(async (req, res, next) => {
    passport.authenticate("kakao")(req, res, next);
  });

  kakaoCallback = asyncHandler(async (req, res, next) => {
    passport.authenticate("kakao", (authError, user, info) => {
      if (authError) {
        logger.error(authError);
        return new FailureLoginRedirect(authError.message).redirect(res);
      }
      if (!user) {
        logger.info(info.message);
        return new FailureLoginRedirect(info.message).redirect(res);
      }
      return req.login(user, { session: false }, (loginError) => {
        if (loginError) {
          logger.error(loginError);
          return new FailureLoginRedirect(loginError.message).redirect(res);
        }

        const refreshToken = makeRefreshToken(user.userId);
        const setCookie = { refreshToken, option: cookieOption(14, "d") };
        return new SuccessLoginRedirectWithCookie("success", setCookie).redirectWithCookie(
          res
        );
      });
    })(req, res, next);
  });
  naver = asyncHandler(async (req, res, next) => {
    passport.authenticate("naver", { authType: "reprompt" })(req, res, next);
  });

  naverCallback = asyncHandler(async (req, res, next) => {
    passport.authenticate("naver", (authError, user, info) => {
      if (authError) {
        logger.error(authError);
        return new FailureLoginRedirect(authError.message).redirect(res);
      }
      if (!user) {
        logger.info(info.message);
        return new FailureLoginRedirect(info.message).redirect(res);
      }
      return req.login(user, { session: false }, (loginError) => {
        if (loginError) {
          logger.error(loginError);
          return new FailureLoginRedirect(loginError.message).redirect(res);
        }

        const refreshToken = makeRefreshToken(user.userId);
        const setCookie = { refreshToken, option: cookieOption(14, "d") };

        return new SuccessLoginRedirectWithCookie("success", setCookie).redirectWithCookie(
          res
        );
      });
    })(req, res, next);
  });

  silentRefresh = asyncHandler(async (req, res, next) => {
    passport.authenticate("refreshJwt", (authError, user, info) => {
      try {
        if (authError) {
          logger.error(authError);
          throw new AuthFailureError(authError.message);
        }
        if (!user) {
          logger.info(info.message);
          throw new AuthFailureError(info.message);
        }
        return req.login(user, { session: false }, (loginError) => {
          if (loginError) {
            logger.error(loginError);
            throw new AuthFailureError(loginError.message);
          }

          const accessToken = makeAccessToken(user.userId);
          return new SuccessResponse("refresh 성공", { accessToken }).send(res);
        });
      } catch (err) {
        next(err);
      }
    })(req, res, next);
  });
}

export const loginController = new LoginController();
