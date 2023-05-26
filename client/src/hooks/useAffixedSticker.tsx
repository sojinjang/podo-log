import { useState, useEffect } from "react";

import { AffixedStickerInfo } from "src/@types/response";
import { API_URL } from "src/constants/API_URL";
import { api } from "src/utils/axiosApi/api";

const useAffixedSticker = (diaryId: number) => {
  const [stickers, setStickers] = useState<AffixedStickerInfo[]>([]);

  const getAffixedStickers = async () => {
    try {
      const { data } = await api.get(API_URL.stickers(diaryId));
      setStickers(data.data);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  useEffect(() => {
    getAffixedStickers();
  }, []);

  const handleUpdateAffixedStickers = (newSticker: AffixedStickerInfo) => {
    setStickers((curStickers) => {
      return [
        ...curStickers.filter(
          (sticker) => sticker.stickedStickerId !== newSticker.stickedStickerId
        ),
        newSticker,
      ];
    });
  };

  return { stickers, getAffixedStickers, handleUpdateAffixedStickers };
};

export default useAffixedSticker;
