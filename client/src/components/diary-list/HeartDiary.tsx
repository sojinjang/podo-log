import React from "react";
import { useNavigate } from "react-router-dom";
import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";
import heartDiaryImg from "../../assets/icons/notebook_love.png";

export const HeartDiary = () => {
  const navigate = useNavigate();

  const onClickImg = () => {
    navigate(PRIVATE_ROUTE.newDiary.path);
  };
  return (
    <img
      src={heartDiaryImg}
      onClick={onClickImg}
      className="mx-auto mt-[6vh] w-[25vh] h-[25vh] cursor-pointer"
    />
  );
};
