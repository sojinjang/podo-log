export const API_URL = Object.freeze({
  kakaoLogin: "/api/login/kakao",
  naverLogin: "/api/login/naver",
  emailLogin: "/api/login/local",
  books: "/api/books",
  book: function (bookId: number) {
    return this.books + `/${bookId}`;
  },
  diaryList: function (bookId: number, limit: number, offset: number) {
    return `${this.book(bookId)}/diaries?limit=${limit}&offset=${offset}`;
  },
});
