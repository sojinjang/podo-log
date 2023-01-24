import passport from "passport";
import { localStrategy } from "./localStrategy";
import { jwtStrategy } from "./jwtStrategy";
import { kakaoStrategy } from "./kakaoStrategy";

export default function () {
  passport.use("local", localStrategy);
  passport.use("jwt", jwtStrategy);
  passport.use("kakao", kakaoStrategy);
}
