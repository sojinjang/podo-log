import passport from "passport";
import { ForbiddenError, TokenExpiredError, AccessTokenError } from "../../core/api-error";
import { UserBookModel } from "../../models";
import asyncHandler from "../../utils/async-handler";
import { logger } from "../../utils/pino";
import { LoggedRequest } from "../../types";
import { Container } from "typedi";

const userBookModel: UserBookModel = Container.get(UserBookModel);

export const isLoggedIn = asyncHandler(async (req, res, next) => {
  passport.authenticate("accessJwt", { session: false }, (err, user, info) => {
    if (err) {
      logger.error(err);
      return next(err);
    }
    if (user) {
      req.user = user;
      next();
    } else {
      logger.error(info);
      if (info.name === "TokenExpiredError") next(new TokenExpiredError());
      else next(new AccessTokenError());
    }
  })(req, res, next);
});

export const isAdmin = asyncHandler(async (req: LoggedRequest, res, next) => {
  const { role } = req.user;
  const isAdmin = role === "admin";
  if (!isAdmin) next(new ForbiddenError("관리자만 접근할수 있습니다."));
  next();
});

export const isBookMember = asyncHandler(async (req: LoggedRequest, res, next) => {
  const bookId = parseInt(req.body.bookId || req.params.bookId);
  const userBookDTO = { userId: req.user.userId, bookId };
  const isMember = await userBookModel.checkUserBook(userBookDTO);
  if (!isMember) next(new ForbiddenError("구성원이 아니라 조회할 수 없습니다."));
  next();
});
