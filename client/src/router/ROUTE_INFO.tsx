import React from "react";

import { Home, BookList, Book, SignUp, NewBook, Grape, MyPage } from "../pages";

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
  diaries: {
    path: "/books",
    element: <BookList />,
  },
  diary: {
    path: "/books/:bookId",
    element: <Book />,
  },
  newDiary: {
    path: "/new-book",
    element: <NewBook />,
  },
  grape: {
    path: "/grape",
    element: <Grape />,
  },
  myPage: {
    path: "/my-page",
    element: <MyPage />,
  },
};

export const PUBLIC_ROUTE_ARR = Object.values(PUBLIC_ROUTE);
export const PRIVATE_ROUTE_ARR = Object.values(PRIVATE_ROUTE);
