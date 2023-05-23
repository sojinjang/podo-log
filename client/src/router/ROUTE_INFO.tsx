import { lazy, Suspense } from "react";
import { DefaultBackground, PinkPurpleBackground } from "src/styles/Common";
import "src/styles/Backgrounds.css";

const Home = lazy(() => import("../pages/Home"));
const BookList = lazy(() => import("../pages/BookList"));
const DiaryList = lazy(() => import("../pages/DiaryList"));
const BookSetting = lazy(() => import("../pages/BookSetting"));
const BookRevision = lazy(() => import("../pages/BookRevision"));
const SignUp = lazy(() => import("../pages/SignUp"));
const NewBook = lazy(() => import("../pages/NewBook"));
const NewDiary = lazy(() => import("../pages/NewDiary"));
const DiaryDetail = lazy(() => import("../pages/DiaryDetail"));
const DiaryRevision = lazy(() => import("../pages/DiaryRevision"));
const Grape = lazy(() => import("../pages/Grape"));
const MyPage = lazy(() => import("../pages/MyPage"));
const EditInfo = lazy(() => import("../pages/EditInfo"));

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
    element: (
      <Suspense fallback={<DefaultBackground className="animated-gradient" />}>
        <Home />
      </Suspense>
    ),
  },
  signUp: {
    path: "/sign-up",
    element: (
      <Suspense fallback={<DefaultBackground className="animated-gradient" />}>
        <SignUp />
      </Suspense>
    ),
  },
};

export const PRIVATE_ROUTE: RouteInfoObj = {
  books: {
    path: "/books",
    element: (
      <Suspense fallback={<PinkPurpleBackground />}>
        <BookList />
      </Suspense>
    ),
  },
  book: {
    path: "/books/:bookId",
    element: (
      <Suspense fallback={<PinkPurpleBackground />}>
        <DiaryList />
      </Suspense>
    ),
  },
  bookSetting: {
    path: "/books/:bookId/setting",
    element: (
      <Suspense fallback={<PinkPurpleBackground />}>
        <BookSetting />
      </Suspense>
    ),
  },
  bookRevision: {
    path: "/books/:bookId/revision",
    element: (
      <Suspense fallback={<PinkPurpleBackground />}>
        <BookRevision />
      </Suspense>
    ),
  },
  newBook: {
    path: "/new-book",
    element: (
      <Suspense fallback={<PinkPurpleBackground />}>
        <NewBook />
      </Suspense>
    ),
  },
  newDiary: {
    path: "/books/:bookId/new-diary",
    element: (
      <Suspense fallback={<PinkPurpleBackground />}>
        <NewDiary />
      </Suspense>
    ),
  },
  diaryDetail: {
    path: "/books/:bookId/:diaryId",
    element: (
      <Suspense fallback={<PinkPurpleBackground />}>
        <DiaryDetail />
      </Suspense>
    ),
  },
  diaryRevision: {
    path: "/books/:bookId/:diaryId/revision",
    element: (
      <Suspense fallback={<PinkPurpleBackground />}>
        <DiaryRevision />
      </Suspense>
    ),
  },
  grape: {
    path: "/grape",
    element: (
      <Suspense fallback={<DefaultBackground className="h-[200vh] animated-grad-grape" />}>
        <Grape />
      </Suspense>
    ),
  },
  myPage: {
    path: "/my-page",
    element: (
      <Suspense fallback={<PinkPurpleBackground />}>
        <MyPage />
      </Suspense>
    ),
  },
  myInfoEdit: {
    path: "/my-page/edit",
    element: (
      <Suspense fallback={<PinkPurpleBackground />}>
        <EditInfo />
      </Suspense>
    ),
  },
};

export const PUBLIC_ROUTE_ARR = Object.values(PUBLIC_ROUTE);
export const PRIVATE_ROUTE_ARR = Object.values(PRIVATE_ROUTE);
