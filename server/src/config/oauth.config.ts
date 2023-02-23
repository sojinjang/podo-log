export const kakao = {
  clientID: process.env.KAKAO_API_KEY as string,
  callbackURL: `${process.env.PODOLOG_SERVER_URL}/api/login/kakao/oauth`,
};

export const naver = {
  clientID: process.env.NAVER_API_ID,
  clientSecret: process.env.NAVER_API_SECRET,
  callbackURL: `${process.env.PODOLOG_SERVER_URL}/api/login/naver/oauth`,
};
