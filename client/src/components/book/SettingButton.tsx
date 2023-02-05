import React from "react";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";

import settingIcon from "../../assets/icons/setting.png";
import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";

const SettingButtonImg = tw.img`
  min-[390px]:h-[50px] h-[40px] absolute top-[1.3vh] md:right-[1vw] right-[2vw] cursor-pointer
`;

const SettingButton = () => {
  return (
    <Link to={PRIVATE_ROUTE.bookSetting.path.split("/").reverse()[0]}>
      <div className="relative">
        <SettingButtonImg src={settingIcon} />
      </div>
    </Link>
  );
};

export default SettingButton;
