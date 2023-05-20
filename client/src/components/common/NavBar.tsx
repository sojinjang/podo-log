import { NavLink } from "react-router-dom";

import { ICON_DESC_PAIR_OBJ } from "src/constants/ICON_DESC_PAIR_OBJ";
import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";
import * as G from "../../styles/Common";

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
      <G.Container>
        <G.IconImg alt={menuInfoObj.description} src={menuIcon}></G.IconImg>
        <G.Description className={menuColor}>{menuInfoObj.description}</G.Description>
      </G.Container>
    </NavLink>
  );
};

export const Navbar = ({ activeMenu }: NavBarProps) => {
  return (
    <G.BarContainer>
      <ButtonContainer activeMenu={activeMenu} menu="books"></ButtonContainer>
      <ButtonContainer activeMenu={activeMenu} menu="grape"></ButtonContainer>
      <ButtonContainer activeMenu={activeMenu} menu="myPage"></ButtonContainer>
    </G.BarContainer>
  );
};
