import React from "react";
import { RecoilRoot } from "recoil";
import Router from "./router";

function App() {
  return (
    <RecoilRoot>
      <Router />
    </RecoilRoot>
  );
}

export default App;
