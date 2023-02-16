import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { API_URL } from "src/constants/API_URL";
import { accessTokenAtom } from "src/recoil/token";
import { get } from "src/utils/api";
import tw from "tailwind-styled-components";

import { useDidMountEffect } from "src/utils/hooks";
import changeToKoreanDate from "src/utils/date";
import { selectedStickersAtom } from "src/recoil/diary-detail/atom";
import { Values } from "../../constants/Values";

interface StickerSectionProps {
  changeEditState: () => void;
}
export interface StickerInfo {
  stickerId: number;
  stickerImg: string;
}
interface StickerPack {
  packageId: number;
  packageName: string;
  expiration: Date;
  stickers: StickerInfo[];
}
interface StickersPreview {
  [packageId: number]: StickersWithExpiry;
}
interface StickersInfoArrObj {
  stickers: StickerInfo[];
}

interface StickersWithExpiry extends StickersInfoArrObj {
  expiration: Date | string;
}

export const StickerSection = ({ changeEditState }: StickerSectionProps) => {
  const [myStickerPack, setMyStickerPack] = useState<StickerPack[]>([]);
  const [stickers, setStickers] = useState<StickersPreview | null>(null);
  const [targetPackId, setTargetPackId] = useState<number>(1);
  const setSelectedStickers = useSetRecoilState(selectedStickersAtom);
  const accessToken = useRecoilValue(accessTokenAtom);
  const getMyStickerPack = async () => {
    try {
      const response = await get(API_URL.myPackages, "", accessToken);
      const myStickerPackArr = response.data;
      setMyStickerPack(myStickerPackArr);
      setStickers(pairPackIdWithStickers(myStickerPackArr));
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };
  const pairPackIdWithStickers = (myStickerPackArr: StickerPack[]) => {
    const stickersObj: StickersPreview = {};
    myStickerPackArr.forEach((pack: StickerPack) => {
      stickersObj[pack.packageId] = { expiration: pack.expiration, stickers: pack.stickers };
    });
    return stickersObj;
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
        {myStickerPack.map((pack) => {
          return (
            <StickerPackName
              onClick={() => {
                setTargetPackId(pack.packageId);
              }}
              key={pack.packageId}
              className={pack.packageId === targetPackId ? "underline" : ""}
            >
              {pack.packageName}
            </StickerPackName>
          );
        })}
      </div>
      <StickerPreviewContainer>
        {stickers &&
          stickers[targetPackId]["stickers"].map((sticker) => {
            return (
              <StickerPreview
                onClick={() => {
                  setSelectedStickers((prev) => {
                    return [
                      ...prev,
                      { stickerId: sticker.stickerId, stickerImg: sticker.stickerImg },
                    ];
                  });
                }}
                key={sticker.stickerId}
                src={sticker.stickerImg}
              />
            );
          })}
      </StickerPreviewContainer>
      <ExpirationDate>
        {stickers &&
          stickers[targetPackId]["expiration"] !== Values.FREE_PACK_EXPIRY &&
          `~ ${changeToKoreanDate(stickers[targetPackId]["expiration"])}`}
      </ExpirationDate>
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
