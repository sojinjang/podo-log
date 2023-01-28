import React from "react";

import { PinkPurpleBackground } from "src/components/common/Backgrounds";
import BackButton from "../components/common/BackButton";
import BookName from "../components/book/BookName";
import NewDiaryButton from "src/components/book/NewDiaryButton";
import SettingButton from "src/components/book/SettingButton";
import DiaryListContainer from "src/components/book/DiaryListContainer";

const Book = () => {
  return (
    <PinkPurpleBackground>
      <BackButton />
      <SettingButton />
      <BookName />
      <NewDiaryButton />
      <DiaryListContainer />
    </PinkPurpleBackground>
  );
};

export default Book;
