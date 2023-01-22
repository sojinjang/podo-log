import React from "react";
import { useNavigate } from "react-router-dom";
import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";

interface DiaryButtonProps {
  readonly name: string;
  readonly numPpl: number;
  readonly color: string;
}

export const DiaryButton = ({ name, numPpl, color }: DiaryButtonProps) => {
  const navigate = useNavigate();
  const onClickImg = () => {
    navigate(PRIVATE_ROUTE.newDiary.path);
  };

  return (
    <div className="cursor-pointer hover:scale-105 transition duration-500 ease-in-out">
      <img
        src={require(`../../assets/icons/diary/${color}.png`)}
        alt="diary"
        onClick={onClickImg}
        className="w-[15vh] h-[15vh]  max-w-xs "
      />
      <div>
        <div>{name}</div>
        <div>{numPpl}</div>
      </div>
    </div>
  );
};
