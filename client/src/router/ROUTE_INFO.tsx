import { Home, DiaryList, Login, SignUp, NewDiary } from "../pages";

export const PUBLIC_ROUTE = {
  home: {
    path: "/",
    element: Home,
  },
  logIn: {
    path: "/login",
    element: Login,
  },
  signUp: {
    path: "/sign-up",
    element: SignUp,
  },
};

export const PRIVATE_ROUTE = {
  diaryList: {
    path: "/diary-list",
    element: DiaryList,
  },
  newDiary: {
    path: "/new-diary",
    element: NewDiary,
  },
};

export const PUBLIC_ROUTE_ARR = Object.values(PUBLIC_ROUTE);
export const PRIVATE_ROUTE_ARR = Object.values(PRIVATE_ROUTE);
