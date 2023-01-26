import React from "react";
import tw from "tailwind-styled-components";

import { DefaultBackground } from "src/components/common/Backgrounds";
import "src/components/common/Backgrounds.css";
import { Greeting } from "src/components/home/Greeting";
import { GrapeIcon } from "src/components/home/GrapeIcon";
import EmailLoginContainer from "../components/home/EmailLoginContainer";
import SNSLoginContainer from "../components/home/SNSLoginContainer";
import SignUpButton from "src/components/home/SignUpButton";

const LoginSection = tw.div`
backdrop-blur-3xl border-4 bg-slate-50/5 border-slate-50/80 rounded-xl 
w-[80%] py-[2vh] mt-[2vh] min-[390px]:mt-[6vh] mx-auto
`;
const Home = () => {
  return (
    <DefaultBackground className="animated-gradient">
      <Greeting />
      <GrapeIcon />
      <LoginSection>
        <EmailLoginContainer />
        <SNSLoginContainer />
        <SignUpButton />
      </LoginSection>
    </DefaultBackground>
  );
};

export default Home;
