import React from "react";
import tw from "tailwind-styled-components";

interface StickerButtonProps {
  changeEditState: () => void;
}

const StickerButton = ({ changeEditState }: StickerButtonProps) => {
  return (
    <div className="flex justify-end">
      <ButtonContainer onClick={changeEditState}>
        <StickerIcon src={require("../../assets/icons/sticker.png")}></StickerIcon>
        <ButtonDesc>스티커</ButtonDesc>
      </ButtonContainer>
    </div>
  );
};

export default StickerButton;

const ButtonContainer = tw.div`
mb-2 md:mb-4 cursor-pointer hover:opacity-50
drop-shadow-xl hover:drop-shadow-none ease-in duration-300
`;

const StickerIcon = tw.img`
w-[3vh] h-[3vh]
m-auto
`;

const ButtonDesc = tw.p`
text-[1.5vh] md:text-[1.3vh] text-center m-auto
`;
