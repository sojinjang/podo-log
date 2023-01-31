export const kakao = {
  clientID: process.env.KAKAO_API_KEY as string,
  callbackURL: `/api/login/kakao/oauth`,
};

export const naver = {
  clientID: process.env.NAVER_API_ID,
  clientSecret: process.env.NAVER_API_SECRET,
  callbackURL: `/api/login/naver/oauth`,
};
