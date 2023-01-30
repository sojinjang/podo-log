import jwt from "jsonwebtoken";
import { accessSecretKey, refreshSecretKey, accessTokenTime } from "../config";

export const makeAccessToken = (userId: number) => {
  try {
    return jwt.sign(
      {
        userId,
      },
      accessSecretKey,
      {
        expiresIn: accessTokenTime,
      }
    );
  } catch (error) {}
};

export const makeRefreshToken = (userId: number) => {
  try {
    return jwt.sign(
      {
        userId,
      },
      refreshSecretKey,
      {
        expiresIn: "14d",
      }
    );
  } catch (error) {
    return "error";
  }
};
