import React from "react";
import tw from "tailwind-styled-components";
import { useRecoilValue } from "recoil";

import { selectedColorAtom } from "../../recoil/new-diary";

const DiaryImg = tw.img`
    mx-auto pt-[9vh] h-[27vh] md:h-[25vh]
`;

const DiaryIcon = () => {
  const selectedColor = useRecoilValue(selectedColorAtom);
  return <DiaryImg src={require(`../../assets/icons/diary/${selectedColor}.png`)} />;
};

export default DiaryIcon;
