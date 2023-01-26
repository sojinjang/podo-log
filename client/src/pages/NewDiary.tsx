import React from "react";
import { useRecoilValue } from "recoil";

import { PurpleBackground } from "src/components/common/Backgrounds";
import BackButton from "src/components/common/BackButton";
import PageTitle from "src/components/common/PageTitle";
import DiaryIcon from "src/components/new-diary/DiaryIcon";
import ColorSelectContainer from "src/components/new-diary/ColorSelectContainer";
import ContainerTitle from "src/components/new-diary/ContainerTitle";
import DiaryTitleInputContainer from "src/components/new-diary/DiaryTitleInputContainer";
import PurpleButton from "src/components/common/PurpleButton";
import { selectedColorAtom, diaryTitleAtom } from "../recoil/new-diary";
import { WARNING_MESSAGE } from "src/constants/WARNING_MESSAGE";

interface CreateNewDiaryArgs {
  selectedColor: string;
  diaryTitle: string;
}

const createNewDiary = ({ selectedColor, diaryTitle }: CreateNewDiaryArgs) => {
  try {
    if (diaryTitle.length < 1) return alert(WARNING_MESSAGE.titleLength);
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
    <PurpleBackground>
      <BackButton />
      <PageTitle title="일기장 만들기" />
      <DiaryIcon />
      <ContainerTitle>표지 색상 선택</ContainerTitle>
      <ColorSelectContainer />
      <ContainerTitle>일기장 제목</ContainerTitle>
      <DiaryTitleInputContainer />
      <PurpleButton
        description="생성하기"
        wrapperStyle="mt-[5vh]"
        buttonStyle="sm:w-40"
        onClickFunc={createNewDiary}
        onClickFuncArgs={{ selectedColor, diaryTitle }}
      />
    </PurpleBackground>
  );
};

export default NewDiary;
