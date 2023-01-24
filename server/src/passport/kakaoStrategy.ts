import { Strategy as KakaoStrategy, VerifyFunction } from "passport-kakao";
import { kakao } from "../config";
import { logger } from "../utils";
import { userModel } from "./../db/models/user";

const opts = kakao;

const kakaoVerify: VerifyFunction = async (accessToken, refreshToken, profile, done) => {
  logger.debug(`카카오 accessToken` + accessToken);
  try {
    const snsId = parseInt(profile.id);
    const exUser = await userModel.get({ snsId, provider: "kakao" });
    if (exUser) {
      done(null, exUser); // 인증 완료
    } else {
      //미가입자
      const { kakao_account, properties } = profile._json;
      const { email } = kakao_account;
      const { profile_image } = properties;
      const newUser = await userModel.create({
        email,
        nickname: profile.displayName,
        profile: profile_image,
        snsId,
        provider: "kakao",
      });
      done(null, newUser);
    }
  } catch (err) {
    done(err);
  }
};

export const kakaoStrategy = new KakaoStrategy(opts, kakaoVerify);
