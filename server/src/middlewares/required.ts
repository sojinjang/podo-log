import passport from "passport";
import asyncHandler from "../utils/async-handler";
import { logger } from "./../utils/pino";

export const isLoggedIn = asyncHandler(async (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (user) {
      req.user = user;
      next();
    } else {
      logger.info(info);
      res.status(403).json(info);
    }
  })(req, res, next);
});
