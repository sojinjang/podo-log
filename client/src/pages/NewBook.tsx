import React from "react";
import { useRecoilValue } from "recoil";
import Bounce from "react-reveal/Bounce";

import { post } from "src/utils/api";
import { selectedColorAtom, bookTitleAtom } from "../recoil/new-book";
import { WARNING_MESSAGE } from "src/constants/WARNING_MESSAGE";
import { PinkPurpleBackground } from "src/components/common/Backgrounds";
import BackButton from "src/components/common/BackButton";
import PageTitle from "src/components/common/PageTitle";
import DiaryIcon from "src/components/new-book/DiaryIcon";
import ColorSelectContainer from "src/components/new-book/ColorSelectContainer";
import ContainerTitle from "src/components/new-book/ContainerTitle";
import BookTitleInputContainer from "src/components/new-book/BookTitleInputContainer";
import PurpleButton from "src/components/common/PurpleButton";
import { accessTokenAtom } from "src/recoil/token";
import { API_URL } from "src/constants/API_URL";

interface CreateNewDiaryArgs {
  color: string;
  name: string;
}

const NewBook = () => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const selectedColor = useRecoilValue(selectedColorAtom);
  const diaryTitle = useRecoilValue(bookTitleAtom);

  const createNewDiary = async (
    e: React.ChangeEvent<HTMLInputElement>,
    { color, name }: CreateNewDiaryArgs
  ) => {
    try {
      if (diaryTitle.length < 1) return alert(WARNING_MESSAGE.titleLength);
      await post(API_URL.books, { color, name }, accessToken);
      //  TODO: api 완성되는대로 db로 데이터 post하도록 변경하기 23.01.25
      return { selectedColor, diaryTitle };
    } catch (err) {
      alert(err);
    }
  };
  return (
    <PinkPurpleBackground>
      <BackButton />
      <PageTitle title="일기장 만들기" />
      <Bounce duration={1500}>
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
      </Bounce>
    </PinkPurpleBackground>
  );
};

export default NewBook;
