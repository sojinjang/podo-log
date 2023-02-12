import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { API_URL } from "src/constants/API_URL";
import { accessTokenAtom } from "src/recoil/token";
import { get } from "src/utils/api";
import tw from "tailwind-styled-components";

import sticker1 from "../../assets/emoji/confused.png";
import sticker2 from "../../assets/emoji/confusion.png";
import sticker3 from "../../assets/emoji/crying.png";
import sticker4 from "../../assets/emoji/dead-skin.png";
import { useDidMountEffect } from "src/utils/hooks";

interface StickerSectionProps {
  changeEditState: () => void;
}

export const StickerSection = ({ changeEditState }: StickerSectionProps) => {
  const mockStickerArr = [sticker1, sticker2, sticker3, sticker4];
  const [myStickerPack, setMyStickerPack] = useState([]);
  const accessToken = useRecoilValue(accessTokenAtom);
  const getMyStickerPack = async () => {
    try {
      const response = await get(API_URL.myPackages, "", accessToken);
      const myStickerPackArr = response.data;
      setMyStickerPack(myStickerPackArr);
      console.log(myStickerPack);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  useDidMountEffect(() => {
    getMyStickerPack();
  }, []);

  return (
    <Container>
      <div className="flex">
        <SectionTitle>스티커</SectionTitle>
        <CloseButton onClick={changeEditState}>X</CloseButton>
      </div>
      <DivisionLine />
      <div className="flex">
        <StickerPackName className="underline">emoji</StickerPackName>
        <StickerPackName>frog</StickerPackName>
      </div>
      <StickerPreviewContainer>
        {mockStickerArr.map((sticker) => {
          return <StickerPreview key={sticker} src={sticker} />;
        })}
      </StickerPreviewContainer>
      <ExpirationDate>~2022/01/17</ExpirationDate>
    </Container>
  );
};

const Container = tw.div`
fixed bottom-0 h-[30vh] w-[calc(100vh/16*9)] flex flex-col bg-white/60
backdrop-blur-sm rounded-t-lg p-4 z-10 overflow-y-scroll
`;

const SectionTitle = tw.p`
font-[notosans] font-bold text-[2.1vh] md:text-[1.9vh]
`;

const CloseButton = tw.button`
flex flex-end cursor-pointer ml-auto
font-[notosans] text-[2vh] md:text-[1.8vh]
`;

const DivisionLine = tw.hr`
h-[2px] bg-[#C7C7C7]
`;

const StickerPackName = tw.p`
font-[notosans] text-[1.5vh] md:text-[1.4vh] font-semibold my-2 mr-3 cursor-pointer 
hover:opacity-50 drop-shadow-xl hover:drop-shadow-none ease-in duration-300 
`;

const StickerPreviewContainer = tw.div`
flex flex-wrap justify-start
`;

const StickerPreview = tw.img`
h-[5.5vh] m-3 cursor-pointer
hover:scale-105 transition duration-500 ease-in-out 
`;

const ExpirationDate = tw.p`
font-[notosans] text-gray-1000 mt-auto ml-auto text-[1.4vh] md:text-[1.2vh]
`;
