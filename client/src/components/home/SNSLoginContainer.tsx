import React from "react";
import tw from "tailwind-styled-components";
import { Link } from "react-router-dom";

import { API_URL } from "src/constants/API_URL";
import naverLogo from "../../assets/icons/sns/naver.png";
import kakaoLogo from "../../assets/icons/sns/kakao.png";

interface SNSContainerProps {
  sectionTitle: string;
}

const SNSLoginContainer = ({ sectionTitle }: SNSContainerProps) => {
  return (
    <div className="mx-auto mt-5 w-[65%]">
      <Divider />
      <SectionDescription>{sectionTitle}</SectionDescription>
      <IconContainer>
        <SNSLoginButtonBg className="bg-[#03C75A]">
          <Link to={process.env.REACT_APP_SERVER_URL + API_URL.naverLogin}>
            <img className="w-[5vh] h-[5vh]" alt="naver" src={naverLogo} />
          </Link>
        </SNSLoginButtonBg>
        <SNSLoginButtonBg className="bg-[#FEE500]">
          <Link to={process.env.REACT_APP_SERVER_URL + API_URL.kakaoLogin}>
            <img className="w-[5vh] h-[5vh]" alt="kakao" src={kakaoLogo} />
          </Link>
        </SNSLoginButtonBg>
      </IconContainer>
    </div>
  );
};

export default SNSLoginContainer;

const SNSLoginButtonBg = tw.div`
relative w-[5vh] h-[5vh] rounded-full m-auto mb-[2vh] cursor-pointer
`;

const Divider = tw.hr`
w-full h-[3px] mx-auto mt-4 bg-slate-50/80 rounded md:mt-10
`;

const SectionDescription = tw.p`
font-sans font-semibold text-slate-50/80 text-[1.5vh] my-4
`;

const IconContainer = tw.div`
flex mx-auto w-[50%]
`;
