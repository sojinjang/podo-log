import React from "react";
import { useRecoilValue } from "recoil";

import { PurpleBackground } from "src/components/common/Backgrounds";
import BackButton from "src/components/common/BackButton";
import PageTitle from "src/components/common/PageTitle";
import DiaryIcon from "src/components/new-book/DiaryIcon";
import ColorSelectContainer from "src/components/new-book/ColorSelectContainer";
import ContainerTitle from "src/components/new-book/ContainerTitle";
import BookTitleInputContainer from "src/components/new-book/BookTitleInputContainer";
import PurpleButton from "src/components/common/PurpleButton";
import { selectedColorAtom, bookTitleAtom } from "../recoil/new-book";
import { WARNING_MESSAGE } from "src/constants/WARNING_MESSAGE";

interface CreateNewDiaryArgs {
  selectedColor: string;
  diaryTitle: string;
}

const createNewDiary = (
  e: React.ChangeEvent<HTMLInputElement>,
  { selectedColor, diaryTitle }: CreateNewDiaryArgs
) => {
  try {
    if (diaryTitle.length < 1) return alert(WARNING_MESSAGE.titleLength);
    //  TODO: api 완성되는대로 db로 데이터 post하도록 변경하기 23.01.25
    return { selectedColor, diaryTitle };
  } catch (err) {
    alert(err);
  }
};

const NewBook = () => {
  const selectedColor = useRecoilValue(selectedColorAtom);
  const diaryTitle = useRecoilValue(bookTitleAtom);
  return (
    <PurpleBackground>
      <BackButton />
      <PageTitle title="일기장 만들기" />
      <DiaryIcon />
      <ContainerTitle>표지 색상 선택</ContainerTitle>
      <ColorSelectContainer />
      <ContainerTitle>일기장 제목</ContainerTitle>
      <BookTitleInputContainer />
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

export default NewBook;
