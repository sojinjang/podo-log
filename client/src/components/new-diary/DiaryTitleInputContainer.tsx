import React from "react";
import { useState } from "react";
import tw from "tailwind-styled-components";

const TitleInput = tw.input`
  font-[notosans] bg-transparent ml-[5px] w-[70%] sm:text-lg
`;

const LetterCount = tw.div`
  font-[notosans] text-gray-1000 ml-auto mr-[5px]
`;
const DiaryTitleInputContainer = () => {
  const [letterCount, setLetterCount] = useState(0);
  return (
    <div className="w-[85%] flex rounded-md bg-white/60 p-3 mx-auto mt-[1.5vh] ">
      <TitleInput
        placeholder="일기장 제목을 입력하세요."
        type="text"
        maxLength={10}
        minLength={1}
        onChange={(e) => {
          setLetterCount(e.target.value.length);
        }}
      ></TitleInput>
      <LetterCount>{letterCount}/10</LetterCount>
    </div>
  );
};

export default DiaryTitleInputContainer;
