import React from "react";
import tw from "tailwind-styled-components";
import { useNavigate } from "react-router-dom";
import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";

interface DiaryButtonProps {
  readonly bookId: number;
  readonly name: string;
  readonly numMembers: number;
  readonly color: string;
}

export const BookButton = ({ bookId, name, numMembers, color }: DiaryButtonProps) => {
  const navigate = useNavigate();
  const onClickImg = () => {
    navigate(PRIVATE_ROUTE.books.path + "/" + bookId, {
      state: {
        name: name,
        numMembers: numMembers,
      },
    });
  };

  return (
    <div className="w-[34%] cursor-pointer hover:scale-105 transition duration-500 ease-in-out">
      <img
        src={require(`../../assets/icons/diary/${color}.png`)}
        alt="diary"
        onClick={onClickImg}
        className="w-[15vh] h-[15vh] m-auto max-w-xs "
      />
      <DiaryDescription>
        <div className="font-[jua]">{name}</div>
        <div className="font-[jua] text-gray-1000 ml-2">{numMembers}</div>
      </DiaryDescription>
    </div>
  );
};

const DiaryDescription = tw.div`
  flex justify-center mb-5 text-xl
`;