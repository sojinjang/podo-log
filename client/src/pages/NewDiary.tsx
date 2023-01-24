import React from "react";

import { PinkPurpleBackground } from "src/components/common/Backgrounds";
import BackButton from "src/components/common/BackButton";
import PageTitle from "src/components/common/PageTitle";
import DiaryIcon from "src/components/new-diary/DiaryIcon";
import ColorSelectContainer from "src/components/new-diary/ColorSelectContainer";
import ContainerTitle from "src/components/new-diary/ContainerTitle";
import DiaryTitleInputContainer from "src/components/new-diary/DiaryTitleInputContainer";
import PurpleButton from "src/components/common/PurpleButton";

const NewDiary = () => {
  return (
    <PinkPurpleBackground>
      <BackButton />
      <PageTitle title="일기장 만들기" />
      <DiaryIcon />
      <ContainerTitle>표지 색상 선택</ContainerTitle>
      <ColorSelectContainer />
      <ContainerTitle>일기장 제목</ContainerTitle>
      <DiaryTitleInputContainer />
      <PurpleButton
        name="생성하기"
        cssClass="mt-[5vh]"
        onClickFunc={() => {
          console.log();
        }}
      />
    </PinkPurpleBackground>
  );
};

export default NewDiary;
