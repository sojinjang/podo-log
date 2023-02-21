import React from "react";
import tw from "tailwind-styled-components";

import moveDownImg from "../../assets/icons/move_down.png";
import moveUpImg from "../../assets/icons/move_up.png";

interface MoveBtnProps {
  isMoveDown: boolean;
  grapeRef?: React.RefObject<HTMLDivElement>;
  stickerShopRef?: React.RefObject<HTMLDivElement>;
}

const MoveBtn = ({ isMoveDown, grapeRef, stickerShopRef }: MoveBtnProps) => {
  const btnImg = isMoveDown ? moveDownImg : moveUpImg;
  const btnDesc = isMoveDown ? "스티커로 교환" : "내 포도알";

  const moveToAnotherSection = () => {
    if (isMoveDown) return stickerShopRef?.current?.scrollIntoView({ behavior: "smooth" });
    grapeRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ContainerWrapper>
      <Container onClick={moveToAnotherSection} className="flex cursor-pointer">
        <BtnIcon src={btnImg} />
        <BtnDesc>{btnDesc}</BtnDesc>
      </Container>
    </ContainerWrapper>
  );
};

export default MoveBtn;

const ContainerWrapper = tw.div`
flex justify-center mx-auto
`;

const Container = tw.div`
flex w-[56vh] h-[3vh] justify-center
drop-shadow-xl hover:drop-shadow-none transition ease-in duration-300
`;

const BtnIcon = tw.img`
h-[2.5vh] my-auto mr-2
`;

const BtnDesc = tw.div`
font-[jua] text-[#80A40E] text-[2.3vh] inline
`;
