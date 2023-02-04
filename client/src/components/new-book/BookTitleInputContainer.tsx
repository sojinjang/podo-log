import React from "react";
import { useState } from "react";
import tw from "tailwind-styled-components";
import { useSetRecoilState } from "recoil";

import { bookTitleAtom } from "src/recoil/new-book";

const TitleInput = tw.input`
  font-[notosans] bg-transparent ml-[5px] w-[70%] sm:text-lg
`;

const LetterCount = tw.div`
  font-[notosans] text-gray-1000 ml-auto mr-[5px]
`;
const BookTitleInputContainer = () => {
  const [letterCount, setLetterCount] = useState(0);
  const setDiaryTitle = useSetRecoilState(bookTitleAtom);
  return (
    <div className="w-[85%] flex rounded-md bg-white/60 p-3 mx-auto mt-[1.5vh] ">
      <TitleInput
        placeholder="일기장 제목을 입력하세요."
        type="text"
        maxLength={10}
        minLength={1}
        onChange={(e) => {
          setLetterCount(e.target.value.length);
          setDiaryTitle(e.target.value);
        }}
      ></TitleInput>
      <LetterCount>{letterCount}/10</LetterCount>
    </div>
  );
};

export default BookTitleInputContainer;
