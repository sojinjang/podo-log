import React from "react";
import tw from "tailwind-styled-components";
import { useNavigate } from "react-router-dom";

import { PinkPurpleBackground } from "src/components/common/Backgrounds";
import BackButton from "../components/common/BackButton";
import PurpleButton from "src/components/common/PurpleButton";
import Fade from "react-reveal/Fade";

const NotFound = () => {
  const navigate = useNavigate();
  const onClickHome = () => {
    navigate("/");
  };
  return (
    <PinkPurpleBackground className="flex">
      <BackButton />
      <Fade duration={1500}>
        <div className="mt-[15vh] mx-auto text-center">
          <PodoLog>PODO LOG</PodoLog>
          <NotFoundIcon alt="not found" src={require("../assets/icons/404-error.png")} />
          <p className="text-[3vh]">페이지를 찾을 수 없습니다.</p>
          <p className="text-[1.7vh]">입력하신 주소가 정확한지 확인해주세요.</p>
          <ButtonContainer onClick={onClickHome}>
            <PurpleButton
              description="홈으로 가기"
              wrapperStyle="mt-[10vh]"
              buttonStyle="sm:w-40"
            />
          </ButtonContainer>
        </div>
      </Fade>
    </PinkPurpleBackground>
  );
};

export default NotFound;

const PodoLog = tw.p`
w-full mb-[10vh] drop-shadow-xl animate-pulse
font-sans font-black text-[4vh]
bg-gradient-to-r from-blue-400 via-green-200/70 to-[#b280f5] inline-block text-transparent bg-clip-text
`;
const NotFoundIcon = tw.img`
mx-auto mb-[1vh] h-[20vh]
`;

const ButtonContainer = tw.div`
inline-block w-auto
`;
