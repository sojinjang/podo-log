import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";
import Fade from "react-reveal/Fade";

import { getCookieValue } from "src/utils/cookie";
import { Keys } from "src/constants/Keys";
import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";
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
  const navigate = useNavigate();
  const isLoggedIn = Boolean(getCookieValue(Keys.ACCESS_TOKEN));
  const moveToDiaries = () => {
    setTimeout(() => navigate(PRIVATE_ROUTE.diaries.path), 4000);
  };

  useEffect(() => {
    if (isLoggedIn) return moveToDiaries;
  }, []);

  return (
    <DefaultBackground className="animated-gradient">
      <Fade duration={3000}>
        <Greeting />
        <GrapeIcon />
      </Fade>
      {!isLoggedIn && (
        <Fade bottom duration={3000}>
          <LoginSection>
            <EmailLoginContainer />
            <SNSLoginContainer />
            <SignUpButton />
          </LoginSection>
        </Fade>
      )}
    </DefaultBackground>
  );
};

export default Home;
