import React from "react";

import { DefaultBackground } from "src/components/common/Backgrounds";
import { Navbar } from "src/components/common/NavBar";
import GrapeInfo from "../components/grape/GrapeInfo";

const Grape = () => {
  return (
    <DefaultBackground className="animated-gradient">
      <GrapeInfo />
      <Navbar activeMenu="grape" />
    </DefaultBackground>
  );
};

export default Grape;
