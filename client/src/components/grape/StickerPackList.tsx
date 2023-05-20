import { useState, useEffect } from "react";
import { API_URL } from "src/constants/API_URL";
import Fade from "react-reveal/Fade";

import { StickerPack } from "src/@types/response";
import { api } from "src/utils/axiosApi/api";
import * as S from "../../styles/Grape";

interface PackListProps {
  updateFocusedPack: (arg: StickerPack | null) => void;
}

const StickerPackList = ({ updateFocusedPack }: PackListProps) => {
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
      <S.PackageListContainer>
        {stickerPacks &&
          stickerPacks.map((pack) => {
            return (
              <S.PackageContainer
                onClick={() => {
                  updateFocusedPack(pack);
                }}
                key={pack.packageId}
              >
                <p className="mx-auto">{pack.packageName}</p>
                <S.StickerPreviewContainer>
                  {pack.stickers.slice(0, 4).map((sticker) => {
                    return (
                      <S.StickerImg
                        key={sticker.stickerId}
                        alt="sticker"
                        src={sticker.stickerImg}
                        className="m-[1.3vh]"
                      />
                    );
                  })}
                </S.StickerPreviewContainer>
              </S.PackageContainer>
            );
          })}
      </S.PackageListContainer>
    </Fade>
  );
};

export default StickerPackList;
