import React from "react";
import tw from "tailwind-styled-components";
import Fade from "react-reveal/Fade";

import { PinkPurpleBackground } from "src/components/common/Backgrounds";
import BackButton from "../components/common/BackButton";
import PageTitle from "src/components/common/PageTitle";
import InviteSection from "src/components/book-setting/InviteSection";
import BookMembersInfo from "src/components/book-setting/BookMembersInfo";

const BookSetting = () => {
  return (
    <PinkPurpleBackground>
      <BackButton />
      <PageTitle title="일기장 설정"></PageTitle>
      <Fade bottom duration={1500}>
        <InviteSection />
        <BookMembersInfo />
        <ClickableContainer>일기장 수정</ClickableContainer>
        <ClickableContainer>일기장 나가기</ClickableContainer>
      </Fade>
    </PinkPurpleBackground>
  );
};

export default BookSetting;

const ClickableContainer = tw.div`
font-[notosans] text-[1.5vh] bg-white/60 rounded-lg cursor-pointer
shadow-lg hover:shadow-none ease-in duration-300
mx-auto mb-[1.5vh] w-[90%] p-3
`;
