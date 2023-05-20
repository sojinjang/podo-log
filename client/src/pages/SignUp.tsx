import Fade from "react-reveal/Fade";

import "src/styles/Backgrounds.css";
import { Greeting } from "src/components/home/Greeting";
import EmailSignUpContainer from "src/components/sign-up/EmailSignUpContainer";
import SNSLoginContainer from "../components/home/SNSLoginContainer";
import * as G from "src/styles/Common";

const SignUp = () => {
  return (
    <G.DefaultBackground className="animated-gradient">
      <Greeting />
      <Fade duration={3000}>
        <G.InputSectionContainer>
          <EmailSignUpContainer />
          <SNSLoginContainer sectionTitle="SNS 계정 회원가입" />
        </G.InputSectionContainer>
      </Fade>
    </G.DefaultBackground>
  );
};

export default SignUp;
