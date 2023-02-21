import React from "react";

import {
  Home,
  BookList,
  Book,
  BookSetting,
  BookRevision,
  SignUp,
  NewBook,
  NewDiary,
  DiaryDetail,
  DiaryRevision,
  Grape,
  MyPage,
  EditInfo,
} from "../pages";

interface RouteInfoObj {
  readonly [key: string]: PathElemPair;
}

interface PathElemPair {
  readonly path: string;
  readonly element: JSX.Element;
}

export const PUBLIC_ROUTE: RouteInfoObj = {
  home: {
    path: "/",
    element: <Home />,
  },
  signUp: {
    path: "/sign-up",
    element: <SignUp />,
  },
};

export const PRIVATE_ROUTE: RouteInfoObj = {
  books: {
    path: "/books",
    element: <BookList />,
  },
  book: {
    path: "/books/:bookId",
    element: <Book />,
  },
  bookSetting: {
    path: "/books/:bookId/setting",
    element: <BookSetting />,
  },
  bookRevision: {
    path: "/books/:bookId/revision",
    element: <BookRevision />,
  },
  newBook: {
    path: "/new-book",
    element: <NewBook />,
  },
  newDiary: {
    path: "/books/:bookId/new-diary",
    element: <NewDiary />,
  },
  diaryDetail: {
    path: "/books/:bookId/:diaryId",
    element: <DiaryDetail />,
  },
  diaryRevision: {
    path: "/books/:bookId/:diaryId/revision",
    element: <DiaryRevision />,
  },
  grape: {
    path: "/grape",
    element: <Grape />,
  },
  myPage: {
    path: "/my-page",
    element: <MyPage />,
  },
  myInfoEdit: {
    path: "/my-page/edit",
    element: <EditInfo />,
  },
};

export const PUBLIC_ROUTE_ARR = Object.values(PUBLIC_ROUTE);
export const PRIVATE_ROUTE_ARR = Object.values(PRIVATE_ROUTE);
