import React from "react";

import { DefaultBackground } from "src/components/common/Backgrounds";
import { Navbar } from "src/components/common/NavBar";
import MoveBtn from "src/components/grape/MoveBtn";
import GrapeInfo from "../components/grape/GrapeInfo";

const Grape = () => {
  return (
    <DefaultBackground className="animated-grad-grape">
      <GrapeInfo />
      <MoveBtn ismoveDown={true} />
      <Navbar activeMenu="grape" />
    </DefaultBackground>
  );
};

export default Grape;
