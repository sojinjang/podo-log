import React from "react";
import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";

const BackButtonImg = tw.img`
z-10 h-[6.5vh] absolute pt-[1vh] cursor-pointer
`;

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <BackButtonImg
      src={require("../../assets/icons/arrow_back.png")}
      onClick={() => navigate(-1)}
    />
  );
};

export default BackButton;
