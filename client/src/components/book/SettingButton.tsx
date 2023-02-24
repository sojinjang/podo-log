import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";

import settingIcon from "../../assets/icons/setting.png";
import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";

const SettingButtonImg = tw.img`
  h-[4.5vh] absolute top-[2vh] right-[1.4vh] cursor-pointer
`;

const SettingButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const onClickSetting = () => {
    navigate(PRIVATE_ROUTE.bookSetting.path.split("/").reverse()[0], {
      state: {
        name: location.state.name,
        color: location.state.color,
      },
    });
  };

  return (
    <div onClick={onClickSetting} className="relative">
      <SettingButtonImg src={settingIcon} />
    </div>
  );
};

export default SettingButton;
