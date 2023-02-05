export const API_URL = Object.freeze({
  kakaoLogin: "/api/login/kakao",
  naverLogin: "/api/login/naver",
  emailLogin: "/api/login/local",
  refreshToken: "/api/login/silent-refresh",
  users: "/api/users",
  books: "/api/books",
  inviteCode: function (bookId: number) {
    return this.books + `/${bookId}/invtt-code`;
  },
  members: function (bookId: number) {
    return this.books + `/${bookId}/members`;
  },
  diaryList: function (bookId: number, limit: number, startIdx: number) {
    return this.books + `/${bookId}/diaries?limit=${limit}&start=${startIdx}`;
  },
  diary: "/api/diaries",
});
