import React from "react";
import { Navigate } from "react-router-dom";

// TODO: 로그인 인증 방식 정해지는대로 isLogin 로그인 상태 확인하는 함수로 변경하기 23.01.18
const isLogin = true;

interface RequireAuthProps {
  children: JSX.Element;
}

export const PrivateRouter = ({ children }: RequireAuthProps) => {
  if (isLogin) {
    return <>{children}</>;
  } else {
    return <Navigate to="/home" />;
  }
};
