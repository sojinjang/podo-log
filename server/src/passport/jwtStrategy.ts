import { ExtractJwt, Strategy as JwtStrategy, VerifyCallback } from "passport-jwt";
import { userModel } from "../db/models";
import { GetUserDTO } from "./../types/user-type.d";
import { jwtSecretKey } from "../config";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecretKey,
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
