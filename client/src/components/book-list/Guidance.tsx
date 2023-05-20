import React from "react";
import * as S from "../../styles/BookList";

interface GuidanceProps {
  readonly isEmpty: boolean;
}

export const Guidance = ({ isEmpty }: GuidanceProps) => {
  if (isEmpty)
    return (
      <S.Phrase>
        일기장을 클릭해
        <br />
        가까운 사람들과
        <br />
        일기를 공유해보세요
      </S.Phrase>
    );
  return (
    <S.Phrase>
      일기장을
      <br />
      선택해보세요
    </S.Phrase>
  );
};
