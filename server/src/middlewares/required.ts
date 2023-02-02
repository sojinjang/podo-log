import passport from "passport";
import { ForbiddenError } from "../core/api-error";
import asyncHandler from "../utils/async-handler";
import { logger } from "./../utils/pino";

export const isLoggedIn = asyncHandler(async (req, res, next) => {
  passport.authenticate("accessJwt", { session: false }, (err, user, info) => {
    if (err) {
      // 에러 분기 필요
      return next(err);
    }
    if (user) {
      req.user = user;
      next();
    } else {
      logger.info(info);
      next(new ForbiddenError(info.message));
    }
  })(req, res, next);
});
