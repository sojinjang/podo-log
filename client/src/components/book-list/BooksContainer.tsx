import React from "react";

import { DiaryInfo } from "src/pages/BookList";
import { HeartDiaryButton } from "src/components/book-list/HeartDiaryButton";
import { BookButton } from "src/components/book-list/BookButton";
import { NewBookButton } from "./NewBookButton";
import Fade from "react-reveal/Fade";

interface DiaryContainerProps {
  isEmpty: boolean;
  userDiaryArr: DiaryInfo[] | undefined;
}

const renderDiaryButtons = (
  userDiaryArr: DiaryInfo[] | undefined
): JSX.Element[] | undefined => {
  const diaryButtons = userDiaryArr?.map((diary: DiaryInfo) => {
    return (
      <BookButton
        key={diary.bookId}
        bookId={diary.bookId}
        bookName={diary.bookName}
        numMembers={diary.numMembers}
        color={diary.color}
      />
    );
  });
  return diaryButtons;
};

export const BooksContainer = ({
  isEmpty,
  userDiaryArr,
}: DiaryContainerProps): JSX.Element => {
  if (isEmpty) return <HeartDiaryButton />;
  return (
    <Fade duration={3000}>
      <div className="flex flex-wrap justify-center mt-[3vh]">
        {renderDiaryButtons(userDiaryArr)}
        <NewBookButton />
      </div>
    </Fade>
  );
};
