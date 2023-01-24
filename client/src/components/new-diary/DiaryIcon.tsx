import React from "react";
import tw from "tailwind-styled-components";

interface DiaryIconProps {
  readonly color: string;
}

const DiaryImg = tw.img`
    mx-auto pt-[9vh] h-[27vh] md:h-[25vh]
`;

const DiaryIcon = ({ color }: DiaryIconProps) => {
  return <DiaryImg src={require(`../../assets/icons/diary/${color}.png`)} />;
};

export default DiaryIcon;
