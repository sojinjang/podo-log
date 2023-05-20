import { useEffect } from "react";
import { useRecoilState } from "recoil";
import Fade from "react-reveal/Fade";

import { Token } from "src/@types/response";
import { accessTokenAtom } from "src/recoil/token";
import { refreshToken, moveToDiaries } from "../utils/token";

import "src/styles/Backgrounds.css";
import { Greeting } from "src/components/home/Greeting";
import { GrapeIcon } from "src/components/home/GrapeIcon";
import EmailLoginContainer from "src/components/home/EmailLoginContainer";
import SNSLoginContainer from "src/components/home/SNSLoginContainer";
import SignUpButton from "src/components/home/SignUpButton";
import * as G from "src/styles/Common";

const Home = () => {
  const [accessToken, setAccessToken] = useRecoilState<Token>(accessTokenAtom);

  useEffect(() => {
    const isSNSLogin = location.search.includes("snslogin");
    if (isSNSLogin) refreshToken(setAccessToken);
    moveToDiaries(accessToken);
  }, [accessToken]);

  return (
    <G.DefaultBackground className="animated-gradient">
      <Fade duration={3000}>
        <Greeting />
        <GrapeIcon />
      </Fade>
      {!accessToken && (
        <Fade bottom duration={3000}>
          <G.InputSectionContainer>
            <EmailLoginContainer />
            <SNSLoginContainer sectionTitle="SNS 계정으로 로그인하기" />
            <SignUpButton />
          </G.InputSectionContainer>
        </Fade>
      )}
    </G.DefaultBackground>
  );
};

export default Home;
