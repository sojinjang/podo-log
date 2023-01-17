import { Home, DiaryList, Login, SignUp } from "../pages";

const PUBLIC_ROUTE = {
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

const PRIVATE_ROUTE = {
  diaryList: {
    path: "/profile",
    element: DiaryList,
  },
};

export const PUBLIC_ROUTE_ARR = Object.values(PUBLIC_ROUTE);
export const PRIVATE_ROUTE_ARR = Object.values(PRIVATE_ROUTE);
