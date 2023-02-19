import React from "react";

import { DefaultBackground } from "src/components/common/Backgrounds";
import { Navbar } from "src/components/common/NavBar";

const Grape = () => {
  return (
    <DefaultBackground className="animated-gradient">
      <Navbar activeMenu="grape" />
    </DefaultBackground>
  );
};

export default Grape;
