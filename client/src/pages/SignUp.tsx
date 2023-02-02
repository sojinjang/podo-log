import React from "react";
import Fade from "react-reveal/Fade";

import { DefaultBackground } from "src/components/common/Backgrounds";
import "src/components/common/Backgrounds.css";
import { Greeting } from "src/components/home/Greeting";
import { InputSectionContainer } from "src/components/common/Input";
import EmailSignUpContainer from "src/components/sign-up/EmailSignUpContainer";
import SNSLoginContainer from "../components/home/SNSLoginContainer";

const SignUp = () => {
  return (
    <DefaultBackground className="animated-gradient">
      <Greeting />
      <Fade duration={3000}>
        <InputSectionContainer>
          <EmailSignUpContainer />
          <SNSLoginContainer sectionTitle="SNS 계정 회원가입" />
        </InputSectionContainer>
      </Fade>
    </DefaultBackground>
  );
};

export default SignUp;
