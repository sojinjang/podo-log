export const kakao = {
  clientID: process.env.KAKAO_API_KEY as string,
  callbackURL: `/api/login/kakao/oauth`,
};
