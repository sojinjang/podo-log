import React from "react";

import { DefaultBackground } from "src/components/common/Backgrounds";
import { Navbar } from "src/components/common/NavBar";
import MoveBtn from "src/components/grape/MoveBtn";
import GrapeInfo from "../components/grape/GrapeInfo";

const Grape = () => {
  return (
    <div className="relative">
      <DefaultBackground className="h-[200vh] animated-grad-grape">
        <GrapeInfo />
        <MoveBtn isMoveDown={true} />
      </DefaultBackground>
      <Navbar activeMenu="grape" />
    </div>
  );
};

export default Grape;
