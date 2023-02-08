import jwt_decode from "jwt-decode";
import { Token } from "src/recoil/token/atom";

interface DecodedToken {
  userId: number;
}

export const getUserId = (accessToken: Token) => {
  if (!accessToken) return undefined;
  const decodedUserInfo: DecodedToken = jwt_decode(accessToken);
  return decodedUserInfo.userId;
};
