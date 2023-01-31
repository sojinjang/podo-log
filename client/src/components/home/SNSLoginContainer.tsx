import React from "react";
import { useSearchParams } from "react-router-dom";
import tw from "tailwind-styled-components";
import { useNavigate, Link } from "react-router-dom";

import { useDidMountEffect } from "src/utils/hooks";
import { refreshToken, moveToDiaries } from "src/utils/token";
import { Token } from "src/recoil/token/atom";
import { API_URL } from "src/constants/API_URL";
import naverLogo from "../../assets/icons/sns/naver.png";
import kakaoLogo from "../../assets/icons/sns/kakao.png";

interface SNSLoginProps {
  accessToken: Token;
  setAccessToken: (arg: Token) => void;
}

const SNSLoginContainer = ({ accessToken, setAccessToken }: SNSLoginProps) => {
  const navigate = useNavigate();
  const [URLSearchParams] = useSearchParams();

  useDidMountEffect(() => {
    const isSNSLogin = URLSearchParams.get("snslogin") === "success";
    if (isSNSLogin) {
      refreshToken(setAccessToken);
    }
    moveToDiaries(accessToken, navigate);
  }, [accessToken]);

  return (
    <div className="mx-auto mt-5 w-[65%]">
      <Divider />
      <SectionDescription>sns 계정으로 로그인하기</SectionDescription>
      <IconContainer>
        <SNSLoginButtonBg>
          <SNSLoginButtonBg className="bg-[#03C75A]">
            <Link to={process.env.REACT_APP_SERVER_URL + API_URL.naverLogin}>
              <img src={naverLogo} />
            </Link>
          </SNSLoginButtonBg>
        </SNSLoginButtonBg>
        <SNSLoginButtonBg className="bg-[#FEE500]">
          <Link to={process.env.REACT_APP_SERVER_URL + API_URL.kakaoLogin}>
            <img src={kakaoLogo} />
          </Link>
        </SNSLoginButtonBg>
      </IconContainer>
    </div>
  );
};

export default SNSLoginContainer;

const SNSLoginButtonBg = tw.div`
relative md:w-[65px] w-[40px] md:h-[65px] h-[40px] rounded-full m-auto mb-[2vh] cursor-pointer
`;

const Divider = tw.hr`
w-full h-[3px] mx-auto mt-4 bg-slate-50/80 rounded md:mt-10
`;

const SectionDescription = tw.p`
font-[notosans] font-semibold text-slate-50/80 text-sm sm:text-lg my-4
`;

const IconContainer = tw.div`
flex mx-auto w-[50%]
`;
