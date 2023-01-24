import React from "react";
import { useRecoilValue } from "recoil";

import { PinkPurpleBackground } from "src/components/common/Backgrounds";
import BackButton from "src/components/common/BackButton";
import PageTitle from "src/components/common/PageTitle";
import DiaryIcon from "src/components/new-diary/DiaryIcon";
import ColorSelectContainer from "src/components/new-diary/ColorSelectContainer";
import ContainerTitle from "src/components/new-diary/ContainerTitle";
import DiaryTitleInputContainer from "src/components/new-diary/DiaryTitleInputContainer";
import PurpleButton from "src/components/common/PurpleButton";
import { selectedColorAtom, diaryTitleAtom } from "../recoil/new-diary";

interface CreateNewDiaryArgs {
  selectedColor: string;
  diaryTitle: string;
}

const createNewDiary = ({ selectedColor, diaryTitle }: CreateNewDiaryArgs) => {
  try {
    //  api 완성되는대로 db로 데이터 post하도록 변경하기 23.01.25
    return { selectedColor, diaryTitle };
  } catch (err) {
    alert(err);
  }
};

const NewDiary = () => {
  const selectedColor = useRecoilValue(selectedColorAtom);
  const diaryTitle = useRecoilValue(diaryTitleAtom);
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
        onClickFunc={createNewDiary}
        onClickFuncArgs={{ selectedColor, diaryTitle }}
      />
    </PinkPurpleBackground>
  );
};

export default NewDiary;
