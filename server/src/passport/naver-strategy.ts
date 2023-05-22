import { Profile, Strategy as NaverStrategy } from "passport-naver-v2";
import { naver } from "../config";
import { logger } from "../utils";
import { UserModel } from "../db/models/user";
import { SNSCreateUserDTO } from "../types/user-type";
import { Container } from "typedi";

const opts = naver;
const userModel: UserModel = Container.get(UserModel);

interface NaverVerifyFunction {
  (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void
  ): void;
}

const naverVerify: NaverVerifyFunction = async (accessToken, refreshToken, profile, done) => {
  logger.debug(`네이버 profile`);
  logger.debug(profile);
  try {
    const snsId = profile.id;
    const [exUser] = await userModel.get({ snsId, provider: "naver" }, false);
    if (exUser) {
      done(null, exUser);
    } else {
      const newUser: SNSCreateUserDTO = {
        email: profile.email,
        nickname: profile.nickname,
        profile: profile.profileImage,
        snsId,
        provider: "naver",
      };
      const result = await userModel.create(newUser);
      newUser.userId = result.insertId;
      done(null, newUser);
    }
  } catch (err) {
    done(err);
  }
};

export const naverStrategy = new NaverStrategy(opts, naverVerify);
