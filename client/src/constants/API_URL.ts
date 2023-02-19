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
  bookDiary: function (bookId: number) {
    return this.books + `/${bookId}/diaries`;
  },
  diaryList: function (bookId: number, limit: number, startIdx: number) {
    return this.bookDiary(bookId) + `?limit=${limit}&start=${startIdx}`;
  },
  diary: "/api/diaries",
  diaryImg: function (diaryId: string) {
    return this.diary + `/image/${diaryId}`;
  },
  comments: "/api/comments",
  diaryComments: function (diaryId: number) {
    return this.comments + `?diaryId=${diaryId}`;
  },
  myPackages: "/api/packages/mine",
  stickers: function (diaryId: number) {
    return this.diary + `/${diaryId}/stickers`;
  },
  grape: "/api/users/grape",
});
