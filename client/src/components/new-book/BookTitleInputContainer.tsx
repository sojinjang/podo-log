import React from "react";
import { useState } from "react";
import tw from "tailwind-styled-components";
import { Input, InputContainer } from "../common/Input";

interface TitleContainerProps {
  register: object;
  refreshIsTitleRevised?: (currentTitle: string) => void;
}

const BookTitleInputContainer = ({ register, refreshIsTitleRevised }: TitleContainerProps) => {
  const [letterCount, setLetterCount] = useState(0);

  return (
    <InputContainer className="flex-row w-[75%]">
      <Input
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
      ></Input>
      <LetterCount>{letterCount}/18</LetterCount>
    </InputContainer>
  );
};

export default BookTitleInputContainer;

const LetterCount = tw.div`
  font-sans text-gray-1000 text-[1.4vh] ml-auto mr-[5px]
`;
