import React from "react";
import { useRecoilState } from "recoil";
import { useNavigate, useSearchParams } from "react-router-dom";
import tw from "tailwind-styled-components";
import Fade from "react-reveal/Fade";

import { accessTokenAtom } from "src/recoil/token";
import { Token } from "src/recoil/token/atom";
import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";
import { refreshToken } from "../utils/token";
import { useDidMountEffect } from "src/utils/hooks";

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
  const [URLSearchParams] = useSearchParams();
  const [accessToken, setAccessToken] = useRecoilState<Token>(accessTokenAtom);
  const moveToDiaries = () => {
    setTimeout(() => navigate(PRIVATE_ROUTE.books.path), 3000);
  };
  const checkAccessToken = () => {
    if (accessToken) return moveToDiaries();
  };

  useDidMountEffect(() => {
    const isSNSLogin = URLSearchParams.get("snslogin") === "success";
    if (isSNSLogin) refreshToken(setAccessToken);
    checkAccessToken();
  }, [accessToken]);

  useDidMountEffect(() => {
    checkAccessToken();
  }, []);

  return (
    <DefaultBackground className="animated-gradient">
      <Fade duration={3000}>
        <Greeting />
        <GrapeIcon />
      </Fade>
      {!accessToken && (
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
