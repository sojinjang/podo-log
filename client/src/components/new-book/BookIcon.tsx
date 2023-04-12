import React from "react";
import tw from "tailwind-styled-components";
import { useRecoilValue } from "recoil";

import { selectedColorAtom } from "../../recoil/book-color";

const BookImg = tw.img`
    mx-auto pt-[9vh] h-[27vh] md:h-[25vh]
`;

const BookIcon = () => {
  const selectedColor = useRecoilValue(selectedColorAtom);
  return <BookImg alt="book" src={require(`../../assets/diary/${selectedColor}.png`)} />;
};

export default BookIcon;
