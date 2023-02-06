import React from "react";
import tw from "tailwind-styled-components";
import { DiaryId } from "./DetailedDiaryContainer";

const StickerButton = ({ diaryId }: DiaryId) => {
  return (
    <div className="flex justify-end">
      <ButtonContainer>
        <StickerIcon src={require("../../assets/icons/sticker.png")}></StickerIcon>
        <ButtonDesc>스티커</ButtonDesc>
      </ButtonContainer>
    </div>
  );
};

export default StickerButton;

const ButtonContainer = tw.div`
mr-6 md:mr-8 mb-2 md:mb-4 cursor-pointer hover:opacity-50
drop-shadow-xl hover:drop-shadow-none ease-in duration-300
`;

const StickerIcon = tw.img`
w-[25px] h-[25px] min-[390px]:w-[33px] min-[390px]:h-[33px] md:w-[45px] md:h-[45px] m-auto
`;

const ButtonDesc = tw.p`
text-[1.5vh] md:text-[1.3vh] text-center m-auto
`;