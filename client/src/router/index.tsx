import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import { PrivateRouter } from "./PrivateRouter";
import { PUBLIC_ROUTE_ARR, PRIVATE_ROUTE_ARR } from "./ROUTE_INFO";
import { NotFound } from "../pages";

const Router = () => {
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
