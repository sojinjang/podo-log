import React from "react";
import { useState } from "react";
import tw from "tailwind-styled-components";

interface TitleContainerProps {
  register: object;
  refreshIsTitleRevised?: (currentTitle: string) => void;
}

const BookTitleInputContainer = ({ register, refreshIsTitleRevised }: TitleContainerProps) => {
  const [letterCount, setLetterCount] = useState(0);

  return (
    <div className="w-[85%] flex rounded-md bg-white/60 p-3 mx-auto mt-[1.5vh] ">
      <TitleInput
        placeholder="일기장 제목을 입력하세요."
        type="text"
        maxLength={18}
        minLength={1}
        required
        {...register}
        onChange={(e) => {
          setLetterCount(e.target.value.length);
          if (refreshIsTitleRevised) refreshIsTitleRevised(e.target.value);
        }}
      ></TitleInput>
      <LetterCount>{letterCount}/18</LetterCount>
    </div>
  );
};

export default BookTitleInputContainer;

const TitleInput = tw.input`
  font-sans bg-transparent ml-[5px] w-[70%] sm:text-lg
`;

const LetterCount = tw.div`
  font-sans text-gray-1000 ml-auto mr-[5px]
`;
