import React from "react";

import { Home, DiaryList, Diary, SignUp, NewDiary, Grape, MyPage } from "../pages";

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
    path: "/diaries",
    element: <DiaryList />,
  },
  diary: {
    path: "/diaries/:bookId",
    element: <Diary />,
  },
  newDiary: {
    path: "/new-diary",
    element: <NewDiary />,
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
