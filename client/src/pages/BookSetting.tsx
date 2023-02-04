import React from "react";
import tw from "tailwind-styled-components";

import { PinkPurpleBackground } from "src/components/common/Backgrounds";
import BackButton from "../components/common/BackButton";
import PageTitle from "src/components/common/PageTitle";
import Fade from "react-reveal/Fade";

const BookSetting = () => {
  return (
    <PinkPurpleBackground>
      <BackButton />
      <PageTitle title="일기장 설정"></PageTitle>
      <Fade bottom duration={1500}>
        <InviteContainer>
          <div className="m-auto">
            <p className="text-center text-[2.5vh]">
              일기장을 공유하고 싶은 분을 초대해보세요!
            </p>
            <div className="flex h-[2vh] mt-[1.5vh]">
              <InviteCodeButton>
                <img src={require("../assets/icons/refresh.png")} />
                <p className="ml-1 text-[1.5vh]">초대코드 재생성</p>
              </InviteCodeButton>
            </div>
            <div className="flex">
              <InviteCodeButton>
                <p className="mt-1 text-[2.5vh]">📎1BBBBB</p>
              </InviteCodeButton>
            </div>
          </div>
        </InviteContainer>
        <Container>일기장 공유 멤버</Container>
        <ClickableContainer>일기장 수정</ClickableContainer>
        <ClickableContainer>일기장 나가기</ClickableContainer>
      </Fade>
    </PinkPurpleBackground>
  );
};

export default BookSetting;

const InviteContainer = tw.div`
flex bg-white/60 rounded-lg shadow-lg 
mx-auto my-[2vh] w-[90%] h-[18vh]
`;

const InviteCodeButton = tw.div`
flex mx-auto text-center cursor-pointer
drop-shadow-lg hover:drop-shadow-none ease-in duration-300
`;

const Container = tw.div`
font-[notosans] text-[1.5vh] bg-white/60 rounded-lg drop-shadow-lg
mx-auto mb-[1.5vh] w-[90%] p-3
`;

const ClickableContainer = tw.div`
font-[notosans] text-[1.5vh] bg-white/60 rounded-lg cursor-pointer
shadow-lg hover:shadow-none ease-in duration-300
mx-auto mb-[1.5vh] w-[90%] p-3
`;
