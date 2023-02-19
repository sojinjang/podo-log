import React from "react";
import tw from "tailwind-styled-components";

import moveDownImg from "../../assets/icons/move_down.png";
import moveUpImg from "../../assets/icons/move_up.png";

interface MoveBtnProps {
  ismoveDown: boolean;
}

const MoveBtn = ({ ismoveDown }: MoveBtnProps) => {
  const btnImg = ismoveDown ? moveDownImg : moveUpImg;
  const btnDesc = ismoveDown ? "스티커로 교환" : "내 포도알";

  return (
    <ContainerWrapper>
      <Container className="flex cursor-pointer">
        <BtnIcon src={btnImg} />
        <BtnDesc>{btnDesc}</BtnDesc>
      </Container>
    </ContainerWrapper>
  );
};

export default MoveBtn;

const ContainerWrapper = tw.div`
flex justify-center
`;

const Container = tw.div`
flex
drop-shadow-xl hover:drop-shadow-none transition ease-in duration-300
`;

const BtnIcon = tw.img`
h-[2.5vh] my-auto mr-2
`;

const BtnDesc = tw.p`
font-[jua] text-[#80A40E] text-[2.5vh]
`;
