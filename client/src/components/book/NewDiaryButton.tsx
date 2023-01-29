import React from "react";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";

import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";
import pencilImg from "../../assets/icons/pencil.png";

const ButtonContainer = tw.div`
flex justify-center w-[90%] h-[8%] mx-auto mt-[2vh] 
bg-white/60 rounded-lg 
hover:border-dashed hover:border-black/80 hover:border-[2.5px]
shadow-lg hover:shadow-none ease-in duration-200
`;

const PencilIcon = tw.img`
h-[2.64vh] my-auto mr-[1vw] md:mr-[0.5vw]
`;

const ButtonDescription = tw.p`
text-[2.2vh] md:text-[2vh] my-auto
`;

const NewDiaryButton = () => {
  return (
    <Link to={PRIVATE_ROUTE.newDiary.path}>
      <ButtonContainer>
        <PencilIcon src={pencilImg} />
        <ButtonDescription>일기 쓰기</ButtonDescription>
      </ButtonContainer>
    </Link>
  );
};

export default NewDiaryButton;
