import { Strategy as KakaoStrategy, VerifyFunction } from "passport-kakao";
import { kakao } from "../config";
import { logger } from "../utils";
import { userModel } from "./../db/models/user";
import { SNSCreateUserDTO } from "./../types/user-type.d";

const opts = kakao;

const kakaoVerify: VerifyFunction = async (accessToken, refreshToken, profile, done) => {
  logger.debug(`카카오 accessToken` + accessToken);
  try {
    const snsId = profile.id;
    const [exUser] = await userModel.get({ snsId, provider: "kakao" });
    if (exUser) {
      done(null, exUser); // 인증 완료
    } else {
      //미가입자
      const { displayName: nickname, _json } = profile;
      const profilePicture = _json.properties?.profile_image;
      const email = _json.kakao_account?.email;

      const newUser: SNSCreateUserDTO = {
        email,
        nickname,
        profile: profilePicture,
        snsId,
        provider: "kakao",
      };
      const result = await userModel.create(newUser);
      newUser.userId = result.insertId;
      done(null, newUser);
    }
  } catch (err) {
    done(err);
  }
};

export const kakaoStrategy = new KakaoStrategy(opts, kakaoVerify);
