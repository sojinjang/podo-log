import React from "react";
import { useNavigate } from "react-router-dom";
import heartDiaryImg from "../../assets/icons/notebook_love.png";

export const HeartDiary = () => {
  const navigate = useNavigate();

  const onClickImg = () => {
    navigate("/new-diary");
  };
  return (
    <img
      src={heartDiaryImg}
      onClick={onClickImg}
      className="mx-auto mt-[6vh] w-[25vh] h-[25vh] cursor-pointer"
    />
  );
};
