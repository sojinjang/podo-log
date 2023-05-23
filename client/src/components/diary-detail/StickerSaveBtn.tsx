import { useRecoilValue } from "recoil";

import { AffixedStickerInfo } from "src/@types/response";
import { EditingStickerInfo } from "src/@types/diary";
import { focusedDiaryIdAtom } from "src/recoil/diary-detail/atom";
import { api } from "src/utils/axiosApi/api";
import { API_URL } from "src/constants/API_URL";
import * as S from "src/styles/DiaryDetail";

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
      <S.SaveButton>저장</S.SaveButton>
    </div>
  );
};

export default StickerSaveBtn;
