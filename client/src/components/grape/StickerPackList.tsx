import React, { useState, useEffect } from "react";
import { API_URL } from "src/constants/API_URL";
import tw from "tailwind-styled-components";
import Fade from "react-reveal/Fade";

import { StickerPack } from "src/@types/response";
import { api } from "src/utils/axiosApi/api";
import { StickerPreviewContainer } from "./Sticker";

interface PackListProps {
  updateFocusedPack: (arg: StickerPack | null) => void;
}

export const StickerPackList = ({ updateFocusedPack }: PackListProps) => {
  const [stickerPacks, setStickerPacks] = useState<StickerPack[]>([]);

  const getStickerPacks = async () => {
    try {
      const { data } = await api.get(API_URL.shop);
      const stickerPackArr = data.data;
      setStickerPacks(stickerPackArr);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  useEffect(() => {
    getStickerPacks();
  }, []);

  return (
    <Fade bottom duration={2000}>
      <PackageListContainer>
        {stickerPacks &&
          stickerPacks.map((pack) => {
            return (
              <PackageContainer
                onClick={() => {
                  updateFocusedPack(pack);
                }}
                key={pack.packageId}
              >
                <p className="mx-auto">{pack.packageName}</p>
                <StickerPreviewContainer>
                  {pack.stickers.slice(0, 4).map((sticker) => {
                    return (
                      <StickerImg
                        key={sticker.stickerId}
                        alt="sticker"
                        src={sticker.stickerImg}
                      />
                    );
                  })}
                </StickerPreviewContainer>
              </PackageContainer>
            );
          })}
      </PackageListContainer>
    </Fade>
  );
};

const PackageListContainer = tw.div`
flex flex-wrap justify-center max-h-[74.5vh] overflow-y-auto scrollbar-hide my-[1.5vh]
`;

const PackageContainer = tw.div`
w-[22vh] h-[23.3vh] flex flex-col px-[1.5vh] py-[1vh]
m-[1.5vh] bg-white/60 rounded-lg text-[1.7vh] cursor-pointer
shadow-lg hover:shadow-none ease-in duration-300
`;

const StickerImg = tw.img`
h-[6.3vh] w-[6.3vh] m-[1.3vh]
`;
