import React from "react";
import Fade from "react-reveal/Fade";

import { DefaultBackground } from "src/components/common/Backgrounds";
import "src/components/common/Backgrounds.css";
import { Greeting } from "src/components/home/Greeting";
import SNSLoginContainer from "../components/home/SNSLoginContainer";

const SignUp = () => {
  return (
    <DefaultBackground className="animated-gradient">
      <Greeting />
      <Fade bottom duration={3000}>
        <SNSLoginContainer sectionTitle="SNS 계정 회원가입" />
      </Fade>
    </DefaultBackground>
  );
};

export default SignUp;
