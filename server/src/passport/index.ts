import passport from "passport";
import { localStrategy } from "./local-strategy";
import { accessJwtStrategy } from "./access-jwt-strategy";
import { refreshJwtStrategy } from "./refresh-jwt-strategy";
import { kakaoStrategy } from "./kakao-strategy";

export default function () {
  passport.use("local", localStrategy);
  passport.use("kakao", kakaoStrategy);
  passport.use("accessJwt", accessJwtStrategy);
  passport.use("refreshJwt", refreshJwtStrategy);
}
