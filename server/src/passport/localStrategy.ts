import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";
import bcrypt from "bcrypt";
import { userModel } from "../db/models";
import { logger } from "../utils";

const opts = {
  usernameField: "email",
  passwordField: "password",
};

const localVerify: VerifyFunction = async (email, password, done) => {
  try {
    const [exUser] = await userModel.get({ email });
    if (exUser) {
      const result = await bcrypt.compare(password, exUser.password);
      if (result) {
        done(null, exUser);
      } else {
        done(null, false, { message: "비밀번호가 일치하지 않습니다." });
      }
    } else {
      done(null, false, { message: "가입되지 않은 회원입니다." });
    }
  } catch (error) {
    logger.error(error);
    done(error);
  }
};

export const localStrategy = new LocalStrategy(opts, localVerify);
