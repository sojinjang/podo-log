import React from "react";
import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";

const BackButtonImg = tw.img`
  min-[390px]:h-[70px] h-[60px] absolute pt-[1vh] cursor-pointer
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
