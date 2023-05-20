import { useState, useEffect } from "react";

import { StickerInfo, MyStickerPack } from "src/@types/response";
import { api } from "src/utils/axiosApi/api";
import changeToKoreanDate from "src/utils/date";
import { Values } from "../../constants/Values";
import { API_URL } from "src/constants/API_URL";
import * as S from "src/styles/DiaryDetail";

interface StickerSectionProps {
  changeEditState: () => void;
  handleAddNewSticker: (newSticker: StickerInfo) => void;
}

interface StickersPreview {
  [packageId: number]: StickersWithExpiry;
}

interface StickersWithExpiry extends Pick<MyStickerPack, "stickers"> {
  expiration: Date | string;
}

const StickerSection = ({ changeEditState, handleAddNewSticker }: StickerSectionProps) => {
  const [myStickerPack, setMyStickerPack] = useState<MyStickerPack[]>([]);
  const [stickers, setStickers] = useState<StickersPreview | null>(null);
  const [targetPackId, setTargetPackId] = useState<number>(1);
  const getMyStickerPack = async () => {
    try {
      const { data } = await api.get(API_URL.myPackages);
      const myStickerPackArr = data.data;
      setMyStickerPack(myStickerPackArr);
      setStickers(pairPackIdWithStickers(myStickerPackArr));
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };
  const pairPackIdWithStickers = (myStickerPackArr: MyStickerPack[]) => {
    const stickersObj: StickersPreview = {};
    myStickerPackArr.forEach((pack: MyStickerPack) => {
      stickersObj[pack.packageId] = { expiration: pack.expiration, stickers: pack.stickers };
    });
    return stickersObj;
  };

  useEffect(() => {
    getMyStickerPack();
  }, []);

  return (
    <S.Container>
      <div className="flex">
        <S.SectionTitle>스티커</S.SectionTitle>
        <S.CloseButton onClick={changeEditState}>X</S.CloseButton>
      </div>
      <S.DivisionLine />
      <div className="flex overflow-x-scroll scrollbar-hide">
        {myStickerPack.map((pack) => {
          return (
            <S.StickerPackName
              onClick={() => {
                setTargetPackId(pack.packageId);
              }}
              key={pack.packageId}
              className={pack.packageId === targetPackId ? "underline" : ""}
            >
              {pack.packageName}
            </S.StickerPackName>
          );
        })}
      </div>
      <S.StickerPreviewContainer>
        {stickers &&
          stickers[targetPackId]["stickers"].map((sticker) => {
            return (
              <S.StickerPreview
                onClick={() => {
                  handleAddNewSticker(sticker);
                }}
                key={sticker.stickerId}
                src={sticker.stickerImg}
                alt="sticker"
              />
            );
          })}
      </S.StickerPreviewContainer>
      <S.ExpirationDate>
        {stickers &&
          stickers[targetPackId]["expiration"] !== Values.FREE_PACK_EXPIRY &&
          `~ ${changeToKoreanDate(stickers[targetPackId]["expiration"])}`}
      </S.ExpirationDate>
    </S.Container>
  );
};

export default StickerSection;
