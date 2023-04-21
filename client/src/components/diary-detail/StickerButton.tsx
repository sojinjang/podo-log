import React from "react";
import tw from "tailwind-styled-components";

import stickerWebP from "../../assets/icons/sticker.webp";
import stickerPng from "../../assets/icons/sticker.png";

interface StickerButtonProps {
  changeEditState: () => void;
}

const StickerButton = ({ changeEditState }: StickerButtonProps) => {
  return (
    <div className="flex justify-end">
      <ButtonContainer onClick={changeEditState}>
        <picture>
          <source srcSet={stickerWebP} type="image/webp" />
          <StickerIcon src={stickerPng} />
        </picture>
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
