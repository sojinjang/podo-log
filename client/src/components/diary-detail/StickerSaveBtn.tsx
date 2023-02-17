import React from "react";
import tw from "tailwind-styled-components";
import { useRecoilValue, useResetRecoilState } from "recoil";

import { accessTokenAtom } from "src/recoil/token";
import { post } from "src/utils/api";
import { API_URL } from "src/constants/API_URL";
import { MoveableStickerInfo } from "src/pages/DiaryDetail";

interface StickerSaveButtonProps {
  diaryId: number;
  selectedStickers: MoveableStickerInfo[];
  changeStickerEditState: () => void;
  handleResetSelectedStcks: () => void;
}
const StickerSaveBtn = ({
  diaryId,
  selectedStickers,
  changeStickerEditState,
  handleResetSelectedStcks,
}: StickerSaveButtonProps) => {
  const accessToken = useRecoilValue(accessTokenAtom);
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
      await post(API_URL.stickers(diaryId), stickers, accessToken);
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
  font-[notosans] text-[2.3vh] md:text-[1.8vh] cursor-pointer hover:opacity-50
  drop-shadow-xl hover:drop-shadow-none ease-in duration-300
`;
