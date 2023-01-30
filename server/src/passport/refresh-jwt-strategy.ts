import { JwtFromRequestFunction, Strategy as JwtStrategy, VerifyCallback } from "passport-jwt";
import { userModel } from "../db/models";
import { GetUserDTO } from "../types/user-type";
import { accessSecretKey } from "../config";
import { parseCookies } from "../utils";

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
  secretOrKey: accessSecretKey,
};

const jwtVerify: VerifyCallback = async (jwtPayload, done) => {
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

export const jwtStrategy = new JwtStrategy(opts, jwtVerify);
