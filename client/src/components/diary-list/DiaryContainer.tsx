import React from "react";

import { DiaryInfo } from "src/pages/DiaryList";
import { HeartDiaryButton } from "src/components/diary-list/HeartDiaryButton";
import { DiaryButton } from "src/components/diary-list/DiaryButton";
import { NewDiaryButton } from "./NewDiaryButton";

interface DiaryContainerProps {
  isEmpty: boolean;
  userDiaryArr: DiaryInfo[] | undefined;
}

const renderDiaryButtons = (
  userDiaryArr: DiaryInfo[] | undefined
): JSX.Element[] | undefined => {
  const diaryButtons = userDiaryArr?.map((diary: DiaryInfo) => {
    return (
      <DiaryButton
        key={diary.bookId}
        bookId={diary.bookId}
        name={diary.bookName}
        numPpl={diary.numPpl}
        color={diary.color}
      />
    );
  });
  return diaryButtons;
};

export const DiaryContainer = ({
  isEmpty,
  userDiaryArr,
}: DiaryContainerProps): JSX.Element => {
  if (isEmpty) return <HeartDiaryButton />;
  return (
    <div className="flex flex-wrap justify-center mt-[3vh]">
      {renderDiaryButtons(userDiaryArr)}
      <NewDiaryButton />
    </div>
  );
};
