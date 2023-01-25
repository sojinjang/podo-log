import React from "react";

import { DefaultBackground } from "src/components/common/Backgrounds";
import "src/components/common/Backgrounds.css";
import { Greeting } from "src/components/home/Greeting";

const Home = () => {
  return (
    <DefaultBackground className="animated-gradient">
      <Greeting />
    </DefaultBackground>
  );
};

export default Home;
