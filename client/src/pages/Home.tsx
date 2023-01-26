import React from "react";

import { DefaultBackground } from "src/components/common/Backgrounds";
import "src/components/common/Backgrounds.css";
import { Greeting } from "src/components/home/Greeting";
import { GrapeIcon } from "src/components/home/GrapeIcon";
import EmailLoginContainer from "../components/home/EmailLoginContainer";

const Home = () => {
  return (
    <DefaultBackground className="animated-gradient">
      <Greeting />
      <GrapeIcon />
      <EmailLoginContainer />
    </DefaultBackground>
  );
};

export default Home;
