import React from "react";
import tw from "tailwind-styled-components";
import { NavLink } from "react-router-dom";

import { ICON_DESC_PAIR_OBJ } from "src/constants/ICON_DESC_PAIR_OBJ";
import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";

interface NavBarProps {
  readonly activeMenu: string;
}

interface Menu extends NavBarProps {
  readonly menu: string;
}

const ButtonContainer = ({ activeMenu, menu }: Menu): JSX.Element => {
  const isActive = menu === activeMenu;
  const menuInfoObj = ICON_DESC_PAIR_OBJ[menu];
  const menuIcon = isActive ? menuInfoObj.icon[0] : menuInfoObj.icon[1];
  const menuColor = isActive ? "text-purple-1000" : "text-gray-1000";

  return (
    <NavLink className="w-[23%] my-auto" to={PRIVATE_ROUTE[menu].path}>
      <Container>
        <IconImg src={menuIcon}></IconImg>
        <Description className={menuColor}>{menuInfoObj.description}</Description>
      </Container>
    </NavLink>
  );
};

export const Navbar = ({ activeMenu }: NavBarProps) => {
  return (
    <BarContainer>
      <ButtonContainer activeMenu={activeMenu} menu="books"></ButtonContainer>
      <ButtonContainer activeMenu={activeMenu} menu="grape"></ButtonContainer>
      <ButtonContainer activeMenu={activeMenu} menu="myPage"></ButtonContainer>
    </BarContainer>
  );
};

const BarContainer = tw.div`
  flex justify-around px-12 mx-auto w-10/12 h-[80px] bg-white/60 rounded-2xl 
  absolute left-1/2 -translate-x-1/2 bottom-[3.5vh] shadow-lg
`;

const Container = tw.div`
  cursor-pointer drop-shadow-xl hover:drop-shadow-none transition ease-in duration-300
`;

const IconImg = tw.img`
  m-auto w-[45px] h-[45px]
`;

const Description = tw.div`
  text-center font-[jua] text-xs
`;
