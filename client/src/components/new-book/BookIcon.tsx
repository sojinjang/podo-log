import React from "react";
import tw from "tailwind-styled-components";
import { useRecoilValue } from "recoil";

import { selectedColorAtom } from "../../recoil/book-color";

const BookImg = tw.img`
    mx-auto pt-[9vh] h-[27vh] md:h-[25vh]
`;

const BookIcon = () => {
  const selectedColor = useRecoilValue(selectedColorAtom);
  return (
    <picture>
      <source srcSet={require(`../../assets/book/${selectedColor}.webp`)} type="image/webp" />
      <BookImg alt="book" src={require(`../../assets/book/${selectedColor}.png`)} />
    </picture>
  );
};

export default BookIcon;
