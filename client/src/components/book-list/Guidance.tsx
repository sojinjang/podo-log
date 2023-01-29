import React from "react";
import tw from "tailwind-styled-components";

interface GuidanceProps {
  readonly isEmpty: boolean;
}

const Phrase = tw.p`
  font-[jua] text-purple-1000 font-normal text-center text-3xl mt-[60px]`;

export const Guidance = ({ isEmpty }: GuidanceProps) => {
  if (isEmpty)
    return (
      <Phrase>
        일기장을 클릭해
        <br />
        가까운 사람들과
        <br />
        일기를 공유해보세요
      </Phrase>
    );
  return (
    <Phrase>
      일기장을
      <br />
      선택해보세요
    </Phrase>
  );
};
