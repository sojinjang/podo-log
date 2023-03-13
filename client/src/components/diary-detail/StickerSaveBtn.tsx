import React from "react";
import tw from "tailwind-styled-components";
import { useRecoilValue } from "recoil";

import { focusedDiaryIdAtom } from "src/recoil/diary-detail/atom";
import { api } from "src/utils/axiosApi";
import { API_URL } from "src/constants/API_URL";
import { EditingStickerInfo } from "src/pages/DiaryDetail";
import { AffixedStickerInfo } from "src/components/common/diary/Sticker";

interface StickerSaveButtonProps {
  selectedStickers: EditingStickerInfo[];
  handleUpdateStickers: (newSticker: AffixedStickerInfo) => void;
  handleResetSelectedStcks: () => void;
  changeStickerEditState: () => void;
}
const StickerSaveBtn = ({
  selectedStickers,
  handleUpdateStickers,
  handleResetSelectedStcks,
  changeStickerEditState,
}: StickerSaveButtonProps) => {
  const diaryId = useRecoilValue(focusedDiaryIdAtom);

  const refineStickersData = () => {
    const stickersData = selectedStickers.map((sticker) => {
      const { stickerId, locX, locY } = sticker;
      return { stickerId, locX, locY };
    });
    return stickersData;
  };
  const handleOnClickSave = async () => {
    try {
      const stickers = refineStickersData();
      const { data } = await api.post(API_URL.stickers(diaryId), stickers);
      const newAffixedStickers = data.data;
      newAffixedStickers.forEach((sticker: AffixedStickerInfo) => {
        handleUpdateStickers(sticker);
      });
      handleResetSelectedStcks();
      changeStickerEditState();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div onClick={handleOnClickSave} className="relative leading-[70px] align-middle">
      <Button>저장</Button>
    </div>
  );
};

export default StickerSaveBtn;

const Button = tw.button`
  h-[70px] absolute md:right-[2vh] right-[1.8vh] m-auto md:pt-[0.8vh]
  font-sans text-[2.3vh] md:text-[1.8vh] cursor-pointer hover:opacity-50
  drop-shadow-xl hover:drop-shadow-none ease-in duration-300
`;
