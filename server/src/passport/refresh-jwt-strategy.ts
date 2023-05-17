import {
  JwtFromRequestFunction,
  Strategy as RefreshJwtStrategy,
  VerifyCallback,
} from "passport-jwt";
import { UserModel } from "../db/models";
import { GetUserDTO } from "../types/user-type";
import { refreshSecretKey } from "../config";
import { parseCookies } from "../utils";
import { Container } from "typedi";

const userModel: UserModel = Container.get(UserModel);

const cookieExtractor: JwtFromRequestFunction = function (req) {
  let cookies = null;
  if (req && req.headers.cookie) {
    cookies = parseCookies(req.headers.cookie);
  }
  const refreshToken = cookies?.refreshToken as string | null;
  return refreshToken;
};

const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: refreshSecretKey,
};

const refreshJwtVerify: VerifyCallback = async (jwtPayload, done) => {
  try {
    const [user] = await userModel.get({ userId: jwtPayload.userId } as GetUserDTO);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false, { message: "올바르지 않은 인증정보 입니다." });
    }
  } catch (err) {
    done(err, false);
  }
};

export const refreshJwtStrategy = new RefreshJwtStrategy(opts, refreshJwtVerify);
