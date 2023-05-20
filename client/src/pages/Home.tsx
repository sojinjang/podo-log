import { useEffect } from "react";
import { useRecoilState } from "recoil";
import Fade from "react-reveal/Fade";

import { Token } from "src/@types/response";
import { accessTokenAtom } from "src/recoil/token";
import { refreshToken, moveToDiaries } from "../utils/token";
import {
  Greeting,
  GrapeIcon,
  EmailLoginContainer,
  SNSLoginContainer,
  SignUpButton,
} from "src/components/home";
import "src/styles/Backgrounds.css";
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
