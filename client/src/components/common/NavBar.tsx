import React from "react";
import tw from "tailwind-styled-components";
import { NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { activeMenuAtom } from "../../recoil/nav-bar/atom";
import { ICON_DESC_PAIR_OBJ } from "src/constants/ICON_DESC_PAIR_OBJ";
import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";

interface Menu {
  readonly menu: string;
}

const BarContainer = tw.div`
  flex justify-around px-12 mx-auto w-10/12 h-[80px] bg-white/60 rounded-2xl absolute left-1/2 -translate-x-1/2
`;

const IconImg = tw.img`
  m-auto w-[45px] h-[45px]
`;

const Description = tw.div`
  text-center font-[jua] text-xs
`;

const ButtonContainer = ({ menu }: Menu): JSX.Element => {
  const activeMenu = useRecoilValue(activeMenuAtom);
  const isActive = menu === activeMenu;
  const menuInfoObj = ICON_DESC_PAIR_OBJ[menu];
  const menuIcon = isActive ? menuInfoObj.icon[0] : menuInfoObj.icon[1];
  const menuColor = isActive ? "text-purple-1000" : "text-gray-1000";

  return (
    <NavLink className="w-[23%] my-auto cursor-pointer" to={PRIVATE_ROUTE[menu].path}>
      <IconImg src={menuIcon}></IconImg>
      <Description className={menuColor}>{menuInfoObj.description}</Description>
    </NavLink>
  );
};

export const Navbar = () => {
  return (
    <div className="relative">
      <div>
        <BarContainer>
          <ButtonContainer menu="diary"></ButtonContainer>
          <ButtonContainer menu="grape"></ButtonContainer>
          <ButtonContainer menu="myPage"></ButtonContainer>
        </BarContainer>
      </div>
    </div>
  );
};
