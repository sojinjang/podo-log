import React from "react";
import { useNavigate } from "react-router-dom";
import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";

export const NewDiaryButton = () => {
  const navigate = useNavigate();
  const onClickImg = () => {
    navigate(PRIVATE_ROUTE.newDiary.path);
  };

  return (
    <div className="w-[34%] cursor-pointer hover:scale-105 transition duration-500 ease-in-out">
      <img
        src={require("../../assets/icons/plus.png")}
        alt="diary"
        onClick={onClickImg}
        className="w-[15vh] h-[15vh] m-auto max-w-xs"
      />
      <div className="font-[jua] text-gray-1000  flex justify-center mb-5 text-lg">
        새 일기장 만들기
      </div>
    </div>
  );
};
