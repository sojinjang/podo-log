import { CookieOptions } from "express";

export const environment = process.env.NODE_ENV as string;
export const port = process.env.PORT;
export const podologURL = process.env.PODOLOG_URL;

function setCookieTime(time: number, unit: "d" | "h" | "m") {
  const expiredM = unit === "m" ? time : unit === "h" ? time * 60 : time * 24 * 60;
  let todayDate = new Date();
  todayDate.setTime(todayDate.getTime() + expiredM * 60 * 1000);
  return todayDate;
}

export const cookieOption = (time: number, unit: "d" | "h" | "m"): CookieOptions => {
  const expires = setCookieTime(time, unit);
  return { httpOnly: true, path: podologURL, sameSite: "lax", expires };
};

export const corsOption = {
  origin: podologURL,
  optionsSuccessStatus: 200,
  credentials: true,
};

export const accessSecretKey = process.env.ACCESS_JWT_SECRET_KEY as string;
export const refreshSecretKey = process.env.REFRESH_JWT_SECRET_KEY as string;

export const logLevel = process.env.LOG_LEVEL;

export const accessTokenTime = environment === "production" ? "1h" : "1w";
