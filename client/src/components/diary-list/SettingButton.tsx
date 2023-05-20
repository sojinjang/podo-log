import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import settingWebP from "../../assets/icons/setting.webp";
import settingPng from "../../assets/icons/setting.png";
import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";
import * as S from "../../styles/DiaryList";

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
      <picture>
        <source srcSet={settingWebP} type="image/webp" />
        <S.SettingButtonImg alt="setting" src={settingPng} />
      </picture>
    </div>
  );
};

export default SettingButton;
