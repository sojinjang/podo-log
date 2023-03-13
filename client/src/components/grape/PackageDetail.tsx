import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import Fade from "react-reveal/Fade";

import { api } from "src/utils/axiosApi";
import { API_URL } from "src/constants/API_URL";
import { StickerPackage } from "src/components/grape/StickerPackList";
import { StickerPreviewContainer } from "./Sticker";
import "./purchaseButton.css";

export interface PackageDetailProps {
  focusedPack: StickerPackage | null;
  resetFocusedPack: () => void;
  numGrape: number;
  deductGrape: () => void;
}

const PackageDetail = ({
  focusedPack,
  resetFocusedPack,
  numGrape,
  deductGrape,
}: PackageDetailProps) => {
  const [isPurchasable, setIsPurchasable] = useState(false);
  const purchasePackage = async () => {
    try {
      await api.post(API_URL.package(Number(focusedPack?.packageId)));
      deductGrape();
      resetFocusedPack();
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  useEffect(() => {
    if (focusedPack?.podoPrice) setIsPurchasable(numGrape >= focusedPack.podoPrice);
  }, []);

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
        <ButtonContainer>
          <Announcement>
            구매 즉시 포도송이가 차감되며, 구매한 스티커 팩은 일주일 간 사용 가능합니다.
          </Announcement>
          <button
            disabled={!isPurchasable}
            onClick={purchasePackage}
            className="purchase-btn cursor-not-allowed"
          >
            <BtnDesc>구매하기</BtnDesc>
          </button>
        </ButtonContainer>
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
text-[2vh] p-1 font-sans ml-auto cursor-pointer
drop-shadow-lg hover:drop-shadow-none hover:opacity-50 ease-in duration-300 
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
h-[6.3vh] w-[6.3vh] mx-[3vh] my-[2vh]
`;

const ButtonContainer = tw.div`
flex flex-col mt-auto mb-[2.2vh]
`;

const Announcement = tw.p`
font-sans text-[1.2vh] mx-auto
`;

const BtnDesc = tw.span`
font-sans text-[1.5vh]
`;
