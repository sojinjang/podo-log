import React, { useState, useEffect } from "react";
import { API_URL } from "src/constants/API_URL";
import { get } from "src/utils/api";
import tw from "tailwind-styled-components";
import { useRecoilValue } from "recoil";

import { accessTokenAtom } from "src/recoil/token";
import { StickerInfo } from "src/components/diary-detail/StickerSection";

interface StickerPackage {
  packageId: number;
  packageName: string;
  podoPrice: number;
  stickers: StickerInfo[];
}
export const StickerPackList = () => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const [stickerPacks, setStickerPacks] = useState<StickerPackage[]>([]);

  const getStickerPacks = async () => {
    try {
      const response = await get(API_URL.shop, "", accessToken);
      const stickerPackArr = response.data;
      setStickerPacks(stickerPackArr);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  useEffect(() => {
    getStickerPacks();
  }, []);

  return (
    <PackageListContainer>
      {stickerPacks &&
        stickerPacks.map((pack) => {
          return (
            <PackageContainer key={pack.packageId}>
              <p className="mx-auto">{pack.packageName}</p>
              <StickerPreviewContainer>
                {pack.stickers.slice(0, 4).map((sticker) => {
                  return <StickerImg key={sticker.stickerId} src={sticker.stickerImg} />;
                })}
              </StickerPreviewContainer>
            </PackageContainer>
          );
        })}
    </PackageListContainer>
  );
};

const PackageListContainer = tw.div`
flex flex-wrap justify-center h-[75vh] overflow-y-auto
mt-[3vh[]
`;

const PackageContainer = tw.div`
w-[22vh] flex flex-col px-[1.5vh] py-[1vh]
m-[1.5vh] bg-white/60 rounded-lg text-[1.7vh] cursor-pointer
shadow-lg hover:shadow-none ease-in duration-300
`;

const StickerPreviewContainer = tw.div`
flex flex-wrap justify-center p-[0.5vh]
`;

const StickerImg = tw.img`
h-[6.7vh] w-[6.7vh] m-[1.1vh]
`;
