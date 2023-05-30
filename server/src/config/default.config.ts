import { CookieOptions } from "express";
import { TokenConfig } from "../types";

export const environment = process.env.NODE_ENV || ("local" as string);
const defaultFlag = environment === "local";
export const port = defaultFlag ? 4000 : process.env.PORT;
export const podologURL = defaultFlag
  ? `http://localhost:3000`
  : (process.env.PODOLOG_URL as string);
export const S3AccessURL = process.env.S3_ACCESS_URL as string;

function setCookieTime(time: number, unit: "d" | "h" | "m") {
  const expiredM = unit === "m" ? time : unit === "h" ? time * 60 : time * 24 * 60;
  let todayDate = new Date();
  todayDate.setTime(todayDate.getTime() + expiredM * 60 * 1000);
  return todayDate;
}

export const cookieOption = (time: number, unit: "d" | "h" | "m"): CookieOptions => {
  const expires = setCookieTime(time, unit);
  return {
    httpOnly: true,
    domain: ".podolog.store",
    path: "/",
    sameSite: "strict",
    expires,
    secure: true,
  };
};

export const corsOption = {
  origin: podologURL,
  optionsSuccessStatus: 200,
  maxAge: 2000,
  credentials: true,
};

export const accessSecretKey = process.env.ACCESS_JWT_SECRET_KEY as string;
export const refreshSecretKey = process.env.REFRESH_JWT_SECRET_KEY as string;

export const accessTokenConfig: TokenConfig = {
  secretKey: accessSecretKey,
  time: defaultFlag ? "1w" : "30m",
};
export const refreshTokenConfig: TokenConfig = {
  secretKey: refreshSecretKey,
  time: "14d",
};

export const logLevel = defaultFlag ? "info" : (process.env.LOG_LEVEL as string);

export const defaultPackageIds = [1];
