import { useState } from "react";

import * as G from "src/styles/Common";
import * as S from "src/styles/Book";

interface TitleContainerProps {
  register: object;
  existingNameLen?: number;
  refreshIsTitleRevised?: (currentTitle: string) => void;
}

const BookTitleInputContainer = ({
  register,
  existingNameLen,
  refreshIsTitleRevised,
}: TitleContainerProps) => {
  const initialLetterCnt = existingNameLen ? existingNameLen : 0;
  const [letterCount, setLetterCount] = useState<number>(initialLetterCnt);

  return (
    <G.InputContainer className="flex-row w-[75%]">
      <G.Input
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
      ></G.Input>
      <S.LetterCount>{letterCount}/18</S.LetterCount>
    </G.InputContainer>
  );
};

export default BookTitleInputContainer;
