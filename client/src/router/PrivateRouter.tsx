import React from "react";
import { Navigate } from "react-router-dom";
import { PUBLIC_ROUTE } from "./ROUTE_INFO";
import { useRecoilValue } from "recoil";
import { accessTokenAtom } from "src/recoil/token";

interface Element {
  children: JSX.Element;
}

export const PrivateRouter = ({ children }: Element) => {
  const isLogin = Boolean(useRecoilValue(accessTokenAtom));

  if (isLogin) return <>{children}</>;
  return <Navigate to={PUBLIC_ROUTE.home.path} />;
};
