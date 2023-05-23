import Fade from "react-reveal/Fade";

import { Greeting, SNSLoginContainer } from "../components/home";
import { EmailSignUpContainer } from "src/components/sign-up/";
import * as G from "src/styles/Common";
import "src/styles/Backgrounds.css";

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
