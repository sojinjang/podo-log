import { ExtractJwt, Strategy as AccessJwtStrategy, VerifyCallback } from "passport-jwt";
import { userModel } from "../db/models";
import { GetUserDTO } from "../types/user-type";
import { accessSecretKey } from "../config";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: accessSecretKey,
};

const accessJwtVerify: VerifyCallback = async (jwtPayload, done) => {
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

export const accessJwtStrategy = new AccessJwtStrategy(opts, accessJwtVerify);
