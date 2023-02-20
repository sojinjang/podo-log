import React from "react";
import { useRecoilValue } from "recoil";
import Fade from "react-reveal/Fade";

import { accessTokenAtom } from "src/recoil/token";
import { post } from "src/utils/api";
import { API_URL } from "src/constants/API_URL";
import { StickerPackage } from "src/components/grape/StickerPackList";

export interface PackageDetailProps {
  focusedPack: StickerPackage | null;
  resetFocusedPack: () => void;
}

const PackageDetail = ({ focusedPack, resetFocusedPack }: PackageDetailProps) => {
  const accessToken = useRecoilValue(accessTokenAtom);

  const purchasePackage = async () => {
    try {
      await post(API_URL.grape, "", accessToken);
      //   setMyGrape({ grain, grape });
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return (
    <Fade bottom>
      <div className="flex flex-col bg-white/60 rounded-lg shadow-lg w-[44vh] h-[75vh] mx-auto m-[1.5vh] px-[1.5vh] py-[1vh]">
        <p onClick={resetFocusedPack} className="text-[2vh] font-sans ml-auto cursor-pointer">
          X
        </p>
        <p className="text-[2.5vh] mx-auto">{focusedPack?.packageName}</p>
        <div className="flex mx-auto">
          <img
            className="h-[1.5vh] my-auto mr-1.5"
            src={require("../../assets/icons/grape.png")}
          />
          <p className="text-[1.6vh] align-bottom">{focusedPack?.podoPrice}</p>
        </div>
        <div className="flex flex-wrap justify-center p-[0.5vh]">
          {focusedPack?.stickers.map((sticker) => {
            return (
              <img
                className="h-[7vh] w-[7vh] m-[2vh]"
                key={sticker.stickerId}
                src={sticker.stickerImg}
              />
            );
          })}
        </div>
      </div>
    </Fade>
  );
};

export default PackageDetail;
