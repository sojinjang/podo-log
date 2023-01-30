import React from "react";
import tw from "tailwind-styled-components";

import { API_URL } from "src/constants/API_URL";
// import { get } from "src/utils/api";
// import { setCookie } from "src/utils/cookie";
// import { Keys } from "src/constants/Keys";
import naverLogo from "../../assets/icons/sns/naver.png";
import kakaoLogo from "../../assets/icons/sns/kakao.png";

const loginWithSNS = async (apiUrl: string) => {
  try {
    window.location.assign(process.env.REACT_APP_SERVER_URL + apiUrl);
    // MEMO: get요청 보내면 카카오 로그인 페이지로 redirect 시키면서 CORS에러 발생
    // api 주소로 아예 이동시키는 것으로 임시 처리함 22.01.27
    // const response = await get(apiUrl);
    // setCookie(Keys.ACCESS_TOKEN, response.accessToken);
  } catch (err) {
    if (err instanceof Error) alert(err.message);
  }
};

type SNSContainerProps = {
  sectionTitle: string;
};

const SNSLoginContainer = ({ sectionTitle }: SNSContainerProps) => {
  return (
    <div className="mx-auto mt-5 w-[65%]">
      <Divider />
      <SectionDescription>{sectionTitle}</SectionDescription>
      <IconContainer>
        <SNSLoginButtonBg
          onClick={() => {
            loginWithSNS(API_URL.naverLogin);
          }}
          className="bg-[#03C75A]"
        >
          <img src={naverLogo} />
        </SNSLoginButtonBg>
        <SNSLoginButtonBg
          onClick={() => {
            loginWithSNS(API_URL.kakaoLogin);
          }}
          className="bg-[#FEE500]"
        >
          <img src={kakaoLogo} />
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
