import React from "react";
import tw from "tailwind-styled-components";
import { NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { activeMenuAtom } from "../../recoil/nav-bar/atom";
import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";

import ColoredDiaryImg from "../../assets/icons/colored_note.png";
import ColoredGrapeImg from "../../assets/icons/colored_grape.png";
import ColoredMyPageImg from "../../assets/icons/colored_mypage.png";
import GrayDiaryImg from "../../assets/icons/gray_note.png";
import GrayGrapeImg from "../../assets/icons/gray_grape.png";
import GrayMyPageImg from "../../assets/icons/gray_mypage.png";

interface PairObj {
  readonly [key: string]: IconDescPair;
}

interface IconDescPair {
  readonly icon: [string, string];
  readonly description: string;
}

interface Menu {
  readonly menu: string;
}

const ICON_DESC_PAIR_OBJ: PairObj = {
  diary: {
    icon: [ColoredDiaryImg, GrayDiaryImg],
    description: "공유일기",
  },
  grape: {
    icon: [ColoredGrapeImg, GrayGrapeImg],
    description: "포도알",
  },
  myPage: {
    icon: [ColoredMyPageImg, GrayMyPageImg],
    description: "마이페이지",
  },
};

const BarContainer = tw.div`
  flex justify-around px-12 mx-auto w-10/12 h-[80px] bg-white/60 rounded-2xl fixed left-1/2 -translate-x-1/2 bottom-10
`;

const IconImg = tw.img`
  w-[45px] h-[45px]
`;

const Description = tw.div`
  font-[jua] text-sm
`;

const ButtonContainer = ({ menu }: Menu): JSX.Element => {
  const activeMenu = useRecoilValue(activeMenuAtom);
  const isActive = menu === activeMenu;
  const menuInfoObj = ICON_DESC_PAIR_OBJ[menu];
  const menuIcon = isActive ? menuInfoObj.icon[0] : menuInfoObj.icon[1];
  const menuColor = isActive ? "text-purple-1000" : "text-gray-1000";

  return (
    <NavLink className="my-auto cursor-pointer" to={PRIVATE_ROUTE[menu].path}>
      <IconImg src={menuIcon}></IconImg>
      <Description className={menuColor}>{menuInfoObj.description}</Description>
    </NavLink>
  );
};

export const Navbar = () => {
  return (
    <div className="absolute">
      <BarContainer>
        <ButtonContainer menu="diary"></ButtonContainer>
        <ButtonContainer menu="grape"></ButtonContainer>
        <ButtonContainer menu="myPage"></ButtonContainer>
      </BarContainer>
    </div>
  );
};
