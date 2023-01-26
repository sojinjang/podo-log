import React from "react";
import tw from "tailwind-styled-components";

import { get } from "src/utils/api";
import { API_URL } from "src/constants/API_URL";
import { setCookie } from "src/utils/cookie";
import { Keys } from "src/constants/Keys";

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

const loginWithSNS = async (apiUrl: string) => {
  try {
    const response = await get(apiUrl);
    setCookie(Keys.ACCESS_TOKEN, response.accessToken);
  } catch (err) {
    if (err instanceof Error) alert(err.message);
  }
};

const SNSLoginContainer = () => {
  return (
    <div className="mx-auto mt-5 w-[65%]">
      <Divider />
      <SectionDescription>sns 계정으로 로그인하기</SectionDescription>
      <IconContainer>
        <SNSLoginButtonBg
          onClick={() => {
            loginWithSNS(API_URL.naverLogin);
          }}
          className="bg-[#03C75A] "
        >
          <img src={require(`../../assets/icons/sns/naver.png`)} />
        </SNSLoginButtonBg>
        <SNSLoginButtonBg
          onClick={() => {
            loginWithSNS(API_URL.kakaoLogin);
          }}
          className="bg-[#FEE500]"
        >
          <img src={require(`../../assets/icons/sns/kakao.png`)} />
        </SNSLoginButtonBg>
      </IconContainer>
    </div>
  );
};

export default SNSLoginContainer;
