import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { useRecoilValue } from "recoil";
import Fade from "react-reveal/Fade";

import { accessTokenAtom } from "src/recoil/token";
import { post } from "src/utils/api";
import { API_URL } from "src/constants/API_URL";
import { StickerPackage } from "src/components/grape/StickerPackList";
import { StickerPreviewContainer } from "./Sticker";
import "./purchaseButton.css";

export interface PackageDetailProps {
  focusedPack: StickerPackage | null;
  resetFocusedPack: () => void;
}

const PackageDetail = ({ focusedPack, resetFocusedPack }: PackageDetailProps) => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const [reset, setReset] = useState(0);
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
      <PackageDetailContainer>
        <CancelButton onClick={resetFocusedPack}>X</CancelButton>
        <PackageName>{focusedPack?.packageName}</PackageName>
        <PodoPriceContainer>
          <PodoPriceImg src={require("../../assets/icons/grape.png")} />
          <PodoPrice>{focusedPack?.podoPrice}</PodoPrice>
        </PodoPriceContainer>
        <StickerPreviewContainer>
          {focusedPack?.stickers.map((sticker) => {
            return <StickerImg key={sticker.stickerId} src={sticker.stickerImg} />;
          })}
        </StickerPreviewContainer>
        <button className="purchase-btn">
          <span className=" font-sans text-[1.5vh]">구매하기</span>
        </button>
      </PackageDetailContainer>
    </Fade>
  );
};

export default PackageDetail;

const PackageName = tw.p`
text-[2.5vh] mx-auto
`;

const PackageDetailContainer = tw.div`
flex flex-col bg-white/60 rounded-lg shadow-lg 
w-[45vh] h-[75vh] mt-[2vh] mx-auto px-[1.5vh] py-[1vh]
`;

const CancelButton = tw.p`
text-[2vh] font-sans ml-auto cursor-pointer
drop-shadow-2xl hover:drop-shadow-none ease-in duration-100
`;

const PodoPriceContainer = tw.div`
flex mx-auto
`;

const PodoPriceImg = tw.img`
h-[1.5vh] my-auto mr-1.5
`;

const PodoPrice = tw.p`
text-[1.6vh]
`;

const StickerImg = tw.img`
h-[7vh] w-[7vh] m-[2vh]
`;
