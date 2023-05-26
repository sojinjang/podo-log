import { ExtractJwt, Strategy as AccessJwtStrategy, VerifyCallback } from "passport-jwt";
import { UserModel } from "../../models";
import { GetUserDTO } from "../../types/user-type";
import { accessSecretKey } from "../../config";
import { Container } from "typedi";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: accessSecretKey,
};
const userModel: UserModel = Container.get(UserModel);
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
