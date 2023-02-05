import React from "react";
import { useRecoilState } from "recoil";
import { useNavigate, useSearchParams } from "react-router-dom";
import Fade from "react-reveal/Fade";

import { accessTokenAtom } from "src/recoil/token";
import { Token } from "src/recoil/token/atom";
import { refreshToken, moveToDiaries } from "../utils/token";
import { useDidMountEffect } from "src/utils/hooks";

import { DefaultBackground } from "src/components/common/Backgrounds";
import "src/components/common/Backgrounds.css";
import { Greeting } from "src/components/home/Greeting";
import { GrapeIcon } from "src/components/home/GrapeIcon";
import { InputSectionContainer } from "src/components/common/Input";
import EmailLoginContainer from "../components/home/EmailLoginContainer";
import SNSLoginContainer from "../components/home/SNSLoginContainer";
import SignUpButton from "src/components/home/SignUpButton";

const Home = () => {
  const ACCESS_TOKEN_EXPIRY_TIME = 3600 * 1000;
  const REFRESH_TIME = 30 * 1000;
  const navigate = useNavigate();
  const [URLSearchParams] = useSearchParams();
  const [accessToken, setAccessToken] = useRecoilState<Token>(accessTokenAtom);

  // MEMO: 아래 hook을 자식 컴포넌트 (SNSLoginContainer)에서 실행하면 access token을 undefined로 인식.
  // 리팩토링 필요 23.02.01
  useDidMountEffect(() => {
    const isSNSLogin = URLSearchParams.get("snslogin") === "success";
    if (isSNSLogin) {
      refreshToken(setAccessToken);
      setInterval(() => refreshToken(setAccessToken), ACCESS_TOKEN_EXPIRY_TIME - REFRESH_TIME);
    }

    moveToDiaries(accessToken, navigate);
  }, [accessToken]);

  useDidMountEffect(() => {
    moveToDiaries(accessToken, navigate);
  }, []);

  return (
    <DefaultBackground className="animated-gradient">
      <Fade duration={3000}>
        <Greeting />
        <GrapeIcon />
      </Fade>
      {!accessToken && (
        <Fade bottom duration={3000}>
          <InputSectionContainer>
            <EmailLoginContainer
              tokenExpireTime={ACCESS_TOKEN_EXPIRY_TIME}
              refreshTime={REFRESH_TIME}
            />
            <SNSLoginContainer sectionTitle="SNS 계정으로 로그인하기" />
            <SignUpButton />
          </InputSectionContainer>
        </Fade>
      )}
    </DefaultBackground>
  );
};

export default Home;
