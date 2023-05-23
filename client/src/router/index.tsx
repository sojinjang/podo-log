import { lazy, Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import { PrivateRouter } from "./PrivateRouter";
import { PUBLIC_ROUTE_ARR, PRIVATE_ROUTE_ARR } from "./ROUTE_INFO";
import { PinkPurpleBackground } from "src/styles/Common";
const NotFound = lazy(() => import("../pages/NotFound"));

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
        <Route
          path="*"
          element={
            <Suspense fallback={<PinkPurpleBackground />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </HashRouter>
  );
};

export default Router;
