import React from "react";
import { useSetRecoilState } from "recoil";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useDidMountEffect } from "src/utils/hooks";
import { accessTokenAtom } from "src/recoil/token";
import { refreshToken } from "src/utils/token";
import { PrivateRouter } from "./PrivateRouter";
import { PUBLIC_ROUTE_ARR, PRIVATE_ROUTE_ARR } from "./ROUTE_INFO";
import { NotFound } from "../pages";

const Router = () => {
  const setAccessToken = useSetRecoilState(accessTokenAtom);
  useDidMountEffect(() => {
    const currentLocation = window.location.pathname;
    for (const pages of PRIVATE_ROUTE_ARR) {
      const isPrivateLocation = pages.path === currentLocation;
      if (isPrivateLocation) refreshToken(setAccessToken);
      break;
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {PUBLIC_ROUTE_ARR.map((route, index) => {
          return <Route path={route.path} element={route.element} key={index} />;
        })}
        {PRIVATE_ROUTE_ARR.map((route, index) => {
          return (
            <Route
              path={route.path}
              element={<PrivateRouter>{route.element}</PrivateRouter>}
              key={index}
            />
          );
        })}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
