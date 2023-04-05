import React from "react";
import { useNavigate } from "react-router-dom";
import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";
import heartDiaryImg from "../../assets/icons/diary/notebook_love.png";

export const HeartDiaryButton = () => {
  const navigate = useNavigate();
  const onClickImg = () => {
    navigate(PRIVATE_ROUTE.newBook.path);
  };

  return (
    <img
      src={heartDiaryImg}
      alt="book"
      onClick={onClickImg}
      className="m-auto mt-[6vh] w-[20vh] h-[20vh] cursor-pointer max-w-xs 
      hover:scale-105 transition duration-500 ease-in-out"
    />
  );
};
