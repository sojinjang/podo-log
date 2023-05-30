import { useState, useEffect } from "react";
import Fade from "react-reveal/Fade";

import { MyGrape, StickerPack } from "src/@types/response";
import { api } from "src/utils/axiosApi/api";
import { API_URL } from "src/constants/API_URL";
import grapeImg from "src/assets/icons/grape.png";
import "src/styles/PurchaseButton.css";
import * as S from "src/styles/Grape";

export interface PackageDetailProps {
  focusedPack: StickerPack | null;
  resetFocusedPack: () => void;
  numGrape: MyGrape["grape"];
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
      <S.PackageDetailContainer>
        <S.CancelButton onClick={resetFocusedPack}>X</S.CancelButton>
        <S.PackageName>{focusedPack?.packageName}</S.PackageName>
        <S.PodoPriceContainer>
          <S.PodoPriceImg alt="grape" src={grapeImg} />
          <S.PodoPrice>{focusedPack?.podoPrice}</S.PodoPrice>
        </S.PodoPriceContainer>
        <S.StickerPreviewContainer>
          {focusedPack?.stickers.map((sticker) => {
            return (
              <S.StickerImg key={sticker.stickerId} alt="sticker" src={sticker.stickerImg} />
            );
          })}
        </S.StickerPreviewContainer>
        <S.ButtonContainer>
          <S.Announcement>
            구매 즉시 포도송이가 차감되며, 구매한 스티커 팩은 일주일 간 사용 가능합니다.
          </S.Announcement>
          <button
            disabled={!isPurchasable}
            onClick={purchasePackage}
            className="purchase-btn cursor-not-allowed"
          >
            <S.PurchaseBtnDesc>구매하기</S.PurchaseBtnDesc>
          </button>
        </S.ButtonContainer>
      </S.PackageDetailContainer>
    </Fade>
  );
};

export default PackageDetail;
