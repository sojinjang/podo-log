import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { HashRouter, Route, Routes } from "react-router-dom";

import { accessTokenAtom } from "src/recoil/token";
import { refreshToken } from "src/utils/token";
import { PrivateRouter } from "./PrivateRouter";
import { PUBLIC_ROUTE_ARR, PRIVATE_ROUTE_ARR } from "./ROUTE_INFO";
import { NotFound } from "../pages";

const Router = () => {
  const setAccessToken = useSetRecoilState(accessTokenAtom);

  useEffect(() => {
    const currentLocation = window.location.pathname;
    for (const pages of PRIVATE_ROUTE_ARR) {
      const isPrivateLocation = pages.path === "/" + currentLocation.split("/")[1];
      if (isPrivateLocation) {
        refreshToken(setAccessToken);
        break;
      }
    }
  }, []);

  return (
    <HashRouter>
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
    </HashRouter>
  );
};

export default Router;
